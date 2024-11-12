import axios from 'axios';
import { useEffect, useState } from 'react';
import getToken from '../../utils/getToken';

const getLastMonthDate = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  return date.toISOString().split('T')[0];
};

const getDaysDate = (days) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
};

export default function Reports() {
  const [spendingData, setSpendingData] = useState([]);
  const [sinceDate, setSinceDate] = useState(getDaysDate(7));
  useEffect(() => {
    async function fetchSpendingData() {
      const token = getToken();
      const res = await axios.get(
        'http://localhost:5000/api/accounts/reports',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            since_date: sinceDate,
          },
        }
      );

      const data = res.data.map((item) => ({
        amount: Number(item.amount),
        date: item.created_at,
        type: item.name.toLowerCase(),
      }));
      setSpendingData(data);
    }

    fetchSpendingData();
  }, [sinceDate]);

  const handleChange = (event) => {
    const value = event.target.value;

    switch (value) {
      case 'last7':
        setSinceDate(getDaysDate(7));
        break;
      case 'last14':
        setSinceDate(getDaysDate(14));
        break;
      case 'thisMonth':
        setSinceDate(getLastMonthDate());
        break;
    }
  };

  console.log(spendingData)

  const totalSpent = spendingData.reduce(
    (sum, item) =>
      item.type === 'external_transfer' ? sum + item.amount : sum,
    0
  );
  return (
    <div className="min-h-screen w-full py-8 sm:py-12 overflow-x-hidden">
      <div className="w-full max-w-md mx-auto px-4 relative">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
          Reports
        </h1>

        <div className="mb-6">
          <select
            className="w-full p-2.5 text-gray-700 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={handleChange}
          >
            <option value="last7">Last 7 days</option>
            <option value="last14">Last 14 days</option>
            <option value="thisMonth">This month</option>
          </select>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm p-6 text-white mb-6">
          <h2 className="text-2xl font-bold text-center">
            €{totalSpent.toFixed(2)}
          </h2>
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
                    day: 'numeric',
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
