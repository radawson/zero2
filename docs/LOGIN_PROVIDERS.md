# Login providers

ZERO uses **NextAuth (Auth.js)** for sign-in. You can enable one or more of:

- **Local (credentials)** — email + password, stored in the app database
- **Google** — OAuth 2.0
- **Facebook** — OAuth 2.0
- **Keycloak** — OpenID Connect

All providers use the same `User` table and roles (`USER`, `AUTHOR`, `ADMIN`). The sign-in page at `/auth/signin` shows the email/password form and any OAuth buttons you have configured.

---

## 1. Local (email and password)

Local logins use the **Credentials** provider. Users must already exist in the database with a **hashed password** set.

### Requirements

- No extra env vars. The Credentials provider is always enabled.
- Users with a password are created via seed or a script (see below).

### Creating a local user

Local users are normal `User` rows with `password` set to a **bcrypt hash**. You can:

1. **Seed** — The default seed creates a local admin: `admin@example.com` / `admin123` (see `prisma/seed.ts`). Run `npm run db:seed` and sign in at `/auth/signin` with those credentials. Change the password in production.
2. **Your own seed or script** — Add more users in `prisma/seed.ts` or a script that hashes a password and upserts the user.

Example in seed (Node):

```ts
import bcrypt from "bcrypt";

const hashedPassword = await bcrypt.hash("your-secure-password", 10);
await prisma.user.upsert({
  where: { email: "admin@example.com" },
  update: { password: hashedPassword },
  create: {
    email: "admin@example.com",
    name: "Admin",
    password: hashedPassword,
    role: "ADMIN",
  },
});
```

After running `npm run db:seed`, you can sign in at `/auth/signin` with the seeded email and password.

### Assigning a password to an existing user

If the user was created by OAuth (Google, etc.) and has no password, you can add one with a small script that:

1. Finds the user by email.
2. Hashes the new password with `bcrypt.hash(password, 10)`.
3. Updates `user.password` in the database.

No env vars are required for the Credentials provider itself.

---

## 2. Google

Google sign-in uses OAuth 2.0. You need a **Client ID** and **Client Secret** from the Google Cloud Console.

### Steps

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create or select a project.
3. Open **APIs & Services** → **Credentials**.
4. **Create credentials** → **OAuth client ID**.
5. Application type: **Web application**.
6. Add **Authorized redirect URIs**:
   - Dev: `http://localhost:3001/api/auth/callback/google`
   - Prod: `https://your-domain.com/api/auth/callback/google`
7. Copy the **Client ID** and **Client Secret**.

### Env vars

Add to `.env`:

```env
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
```

If either is missing, the Google button is not shown on the sign-in page.

### First sign-in

On first sign-in with Google, NextAuth creates a `User` (and `Account`) in the database. Assign roles later with your existing role-assignment script if needed.

---

## 3. Facebook

Facebook sign-in uses OAuth 2.0. You need an **App ID** and **App Secret** from the Meta for Developers site.

### Steps

1. Go to [Meta for Developers](https://developers.facebook.com/).
2. Create or select an app → **Facebook Login** → **Settings**.
3. Add **Valid OAuth Redirect URIs**:
   - Dev: `http://localhost:3001/api/auth/callback/facebook`
   - Prod: `https://your-domain.com/api/auth/callback/facebook`
4. In **Settings** → **Basic**, copy **App ID** (Client ID) and **App Secret** (Client Secret).

### Env vars

Add to `.env`:

```env
FACEBOOK_CLIENT_ID=your-app-id
FACEBOOK_CLIENT_SECRET=your-app-secret
```

If either is missing, the Facebook button is not shown.

### First sign-in

NextAuth creates the `User` and `Account` on first sign-in. Use your role-assignment script to set `ADMIN` / `AUTHOR` if needed.

---

## 4. Keycloak

Keycloak sign-in uses **OpenID Connect**. You need a Keycloak realm and a client with client ID, client secret, and issuer URL.

### Steps

1. In your Keycloak admin UI, create or use a **realm**.
2. Create a **Client** (e.g. `zero`).
3. Set:
   - **Client authentication** ON (confidential client).
4. **Valid redirect URIs**:
   - Dev: `http://localhost:3001/api/auth/callback/keycloak`
   - Prod: `https://your-domain.com/api/auth/callback/keycloak`
5. Copy from the client:
   - **Client ID**
   - **Client secret** (Credentials tab)
6. **Issuer** is the realm OpenID configuration URL, e.g.:
   - `https://your-keycloak.example.com/realms/your-realm`

### Env vars

Add to `.env`:

```env
KEYCLOAK_CLIENT_ID=zero
KEYCLOAK_CLIENT_SECRET=your-client-secret
KEYCLOAK_ISSUER=https://your-keycloak.example.com/realms/your-realm
```

To show the Keycloak button on the sign-in page, you must also set:

```env
NEXT_PUBLIC_KEYCLOAK_ENABLED=true
```

(`NEXT_PUBLIC_` is required so the client can show/hide the button.)

### First sign-in

NextAuth creates the `User` and `Account` on first sign-in. Assign roles with your script as for Google/Facebook.

---

## Summary

| Provider   | Env vars required                         | Notes                                      |
| ---------- | ----------------------------------------- | ----------------------------------------- |
| **Local**  | None                                      | User must exist with hashed `password`    |
| **Google** | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Redirect: `…/api/auth/callback/google`    |
| **Facebook** | `FACEBOOK_CLIENT_ID`, `FACEBOOK_CLIENT_SECRET` | Redirect: `…/api/auth/callback/facebook` |
| **Keycloak** | `KEYCLOAK_CLIENT_ID`, `KEYCLOAK_CLIENT_SECRET`, `KEYCLOAK_ISSUER` | Also set `NEXT_PUBLIC_KEYCLOAK_ENABLED=true` to show button |

All providers use the same `NEXTAUTH_SECRET` and `NEXTAUTH_URL` (see main README / `.env.example`).
