
export default function Accounts() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="overflow-x-auto shadow-md rounded-lg">
        <div style={{ maxHeight: "calc(100vh - 100px)" }} className="overflow-y-auto">
          <table className="w-full text-xs sm:text-sm text-left">
          <thead className="sticky top-0 bg-white">
              <tr>
                <th className="border border-slate-600 px-2 sm:px-4 py-2">Number</th>
                <th className="border border-slate-600 px-2 sm:px-4 py-2">Type</th>
                <th className="border border-slate-600 px-2 sm:px-4 py-2">Amount</th>
                <th className="border border-slate-600 px-2 sm:px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
            {[...Array(4)].map((_, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <td className="border border-slate-600 px-2 sm:px-4 py-2">42242424</td>
                  <td className="border border-slate-600 px-2 sm:px-4 py-2">Withdraw</td>
                  <td className="border border-slate-600 px-2 sm:px-4 py-2" style={{ color: '#16a34a' }}>$300</td>
                  <td className="border border-slate-600 px-2 sm:px-4 py-2" style={{ color: index === 1 ? '#16a34a' : 'inherit' }}>
                    {index === 1 ? 'Selected' : 'Select'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}