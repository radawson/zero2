import Link from "next/link";

export function Banner() {
  return (
    <div
      className="border-b border-z-red/50 bg-z-black/90 px-4 py-2.5 text-center text-white backdrop-blur-sm"
      role="alert"
    >
      <span className="mr-2 font-bold text-z-red" aria-hidden>
        ☣
      </span>
      <span className="text-shadow">This site is currently undergoing maintenance.</span>{" "}
      <Link
        href="/outbreak"
        className="font-medium text-z-green underline transition-colors hover:text-z-green/80"
      >
        Read the Outbreak
      </Link>
    </div>
  );
}
