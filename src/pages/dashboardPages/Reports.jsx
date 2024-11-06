import { useState } from 'react';

export default function Reports() {
  const [spendingData] = useState([
    { date: '2024-03-20', amount: 45.50 },
    { date: '2024-03-19', amount: 32.75 },
    { date: '2024-03-18', amount: 67.20 },
    { date: '2024-03-17', amount: 23.40 },
    { date: '2024-03-16', amount: 89.90 },
    { date: '2024-03-15', amount: 12.30 },
    { date: '2024-03-14', amount: 54.60 },
  ]);

  const totalSpent = spendingData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="min-h-screen w-full py-8 sm:py-12">
      <div className="w-full max-w-md mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
          Reports
        </h1>
        
        
        <div className="mb-6">
          <select className="w-full p-2.5 text-gray-700 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option>Last 7 days</option>
            <option>Last 14 days</option>
            <option>This month</option>
          </select>
        </div>

        
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm p-6 text-white mb-6">
          <p className="text-blue-100 mt-1 text-center">Last 7 days</p>
        </div>

        
        <div className="bg-white rounded-xl shadow-sm p-6">
          
          <div className="space-y-3">
            {spendingData.map((item) => (
              <div 
                key={item.date} 
                className="flex justify-between items-center p-4 border border-gray-200 rounded-xl"
              >
                <div className="text-gray-800">
                  {new Date(item.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="font-semibold text-gray-800">
                €{item.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}