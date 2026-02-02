import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="panel panel-glow mx-auto max-w-2xl p-8 text-center text-white md:p-12">
        <h1 className="mb-6 text-3xl font-bold text-shadow-lg md:text-4xl">
          Zombie Emergency Response Organization
        </h1>
        <p className="mb-8 text-white/90 text-shadow">
          Be prepared for anything.
        </p>
        <Image
          src="/images/zeropatch-lg.png"
          alt="ZERO Logo"
          width={200}
          height={200}
          className="mx-auto mb-8"
        />
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/outbreak" className="btn-primary">
            Read the Outbreak
          </Link>
          <Link href="/join" className="btn-secondary">
            Join ZERO
          </Link>
        </div>
      </div>
    </div>
  );
}
