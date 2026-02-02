export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="mb-8 text-3xl font-bold text-z-black">
          Zombie Emergency Response Organization
        </h1>
        <img
          src="/images/zeropatch-lg.png"
          alt="ZERO Logo"
          width={200}
          height={200}
          className="mx-auto mb-8"
        />
      </div>
    </div>
  );
}
