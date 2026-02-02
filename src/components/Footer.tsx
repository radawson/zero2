import Link from "next/link";

export function Footer() {
  return (
    <footer id="footer" className="mt-auto bg-z-black text-white">
      <div className="container mx-auto grid gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h5 className="mb-2 font-bold">Zombie Emergency Response Organization</h5>
          <p>Be Prepared for anything...</p>
        </div>
        <div>
          <h5 className="mb-2 font-bold">Quick Links</h5>
          <ul className="space-y-1">
            <li>
              <Link href="/join" className="hover:text-z-green">Get Started</Link>
            </li>
            <li>
              <Link href="/shopping" className="hover:text-z-green">Merchandise</Link>
            </li>
            <li>
              <Link href="/news" className="hover:text-z-green">News</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-z-green">About</Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="mb-2 font-bold">Get Started</h5>
          <p className="mb-2">Join the mailing list to get news and updates.</p>
          <Link
            href="/join"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded bg-z-green px-4 py-2 text-z-black hover:bg-z-green/90"
          >
            Register Now
          </Link>
        </div>
        <div>
          <h5 className="mb-2 font-bold">Contact Us</h5>
          <p>
            <a
              href="mailto:info@zemergency.org"
              className="hover:text-z-green"
            >
              info@zemergency.org
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-white/20 py-4 text-center text-sm">
        <p>Copyright Z.E.R.O. © {new Date().getFullYear()}. All rights reserved.</p>
      </div>
    </footer>
  );
}
