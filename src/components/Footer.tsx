import Link from "next/link";

export function Footer() {
  return (
    <footer id="footer" className="mt-auto border-t border-z-gray/50 bg-z-black/90 text-white backdrop-blur-md">
      <div className="container mx-auto grid gap-8 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h5 className="mb-2 font-bold text-shadow">Zombie Emergency Response Organization</h5>
          <p className="text-white/90">Be Prepared for anything...</p>
        </div>
        <div>
          <h5 className="mb-2 font-bold text-z-green">Quick Links</h5>
          <ul className="space-y-2">
            <li>
              <Link href="/join" className="transition-colors hover:text-z-green">Get Started</Link>
            </li>
            <li>
              <Link href="/shopping" className="transition-colors hover:text-z-green">Merchandise</Link>
            </li>
            <li>
              <Link href="/news" className="transition-colors hover:text-z-green">News</Link>
            </li>
            <li>
              <Link href="/about" className="transition-colors hover:text-z-green">About</Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="mb-2 font-bold text-z-green">Get Started</h5>
          <p className="mb-3 text-white/90">Join the mailing list to get news and updates.</p>
          <Link
            href="/join"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-block transition-shadow hover:shadow-[0_0_15px_rgba(166,181,86,0.5)]"
          >
            Register Now
          </Link>
        </div>
        <div>
          <h5 className="mb-2 font-bold text-z-green">Contact Us</h5>
          <p>
            <a
              href="mailto:info@zemergency.org"
              className="transition-colors hover:text-z-green"
            >
              info@zemergency.org
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-z-gray/50 py-4 text-center text-sm text-white/70">
        <p>Copyright Z.E.R.O. © {new Date().getFullYear()}. All rights reserved.</p>
      </div>
    </footer>
  );
}
