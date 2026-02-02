export default function TestPage() {
  const sampleData = [
    { id: 1, name: "Item A" },
    { id: 2, name: "Item B" },
    { id: 3, name: "Item C" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="panel panel-glow mx-auto max-w-2xl p-8 text-white">
        <h1 className="mb-6 text-3xl font-bold text-shadow">Test Page</h1>
        <div className="overflow-hidden rounded-lg border border-z-gray/50">
          <table className="w-full" aria-label="Elements">
            <thead className="bg-z-gray/50">
              <tr>
                <th className="px-4 py-2 text-left font-bold text-z-green">Id</th>
                <th className="px-4 py-2 text-left font-bold text-z-green">Name</th>
              </tr>
            </thead>
            <tbody>
              {sampleData.map((row) => (
                <tr key={row.id} className="border-t border-z-gray/50">
                  <td className="px-4 py-2 text-white/90">{row.id}</td>
                  <td className="px-4 py-2 text-white/90">{row.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
