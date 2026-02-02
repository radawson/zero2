export default function TestPage() {
  const sampleData = [
    { id: 1, name: "Item A" },
    { id: 2, name: "Item B" },
    { id: 3, name: "Item C" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-z-black">Test Page</h1>
      <div className="overflow-hidden rounded-lg border border-z-gray/30 shadow">
        <table className="w-full" aria-label="Elements">
          <thead className="bg-z-black/10">
            <tr>
              <th className="px-4 py-2 text-left font-bold">Id</th>
              <th className="px-4 py-2 text-left font-bold">Name</th>
            </tr>
          </thead>
          <tbody>
            {sampleData.map((row) => (
              <tr key={row.id} className="border-t border-z-gray/20">
                <td className="px-4 py-2">{row.id}</td>
                <td className="px-4 py-2">{row.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
