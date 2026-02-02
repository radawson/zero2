import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/auth/signin?callbackUrl=/admin");
  const role = session.user.role;
  if (role !== "ADMIN" && role !== "AUTHOR") redirect("/");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold text-z-black">Admin</h1>
      <nav className="mb-8 flex gap-4">
        <a href="/admin/posts" className="text-z-purple hover:underline">
          Posts
        </a>
        {role === "ADMIN" && (
          <a href="/admin/channels" className="text-z-purple hover:underline">
            Channels
          </a>
        )}
        <a href="/outbreak" className="text-z-gray hover:underline">
          View blog
        </a>
      </nav>
      {children}
    </div>
  );
}
