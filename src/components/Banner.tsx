import Link from "next/link";

export function Banner() {
  return (
    <div
      className="bg-amber-500/90 px-4 py-2 text-center text-z-black"
      role="alert"
    >
      This site is currently undergoing maintenance.{" "}
      <a
        href="https://www.cdc.gov/coronavirus/2019-nCoV/index.html"
        className="underline hover:text-z-purple"
      >
        CoVID-19 Outbreak
      </a>{" "}
      information, click{" "}
      <Link href="/outbreak" className="font-medium underline hover:text-z-purple">
        here
      </Link>
    </div>
  );
}
