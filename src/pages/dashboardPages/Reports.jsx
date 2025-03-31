import axios from "axios";
import { useEffect, useState } from "react";
import getToken from "../../utils/getToken";
import PropTypes from "prop-types";

export default function Reports() {
  const [userReport, setUserReport] = useState([]);
  const [showNoTransactions, setShowNoTransactions] = useState(false);

  const fetchSpendingData = async () => {
    const token = getToken();
    try {
      const response = await axios.get(
        "http://localhost:5000/api/accounts/users/user-report",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("API Response:", response.data);

      const filteredData = response.data.filter(
        (user) => user.email === user.email
      ); // Replace with the actual email
      setUserReport(filteredData);
      setShowNoTransactions(filteredData.length === 0);
    } catch (error) {
      console.error("Error fetching user report:", error);
      setShowNoTransactions(true);
    }
  };

  useEffect(() => {
    fetchSpendingData();
  }, []);

  const uniqueReports = Array.from(new Set(userReport.map(JSON.stringify))).map(
    JSON.parse
  );

  return (
    <div className="w-full rounded">
      <div className="min-h-screen w-full py-8 sm:py-12">
        <div className="w-full max-w-7xl mx-auto px-4 relative">
          <h1 className="text-2xl sm:text-3xl font-bold text-tprimary mb-6 text-center">
            Reports
          </h1>

          {uniqueReports.length > 0 ? (
            <div className="mt-8 w-full">
              <table className="w-full divide-y divide-gray-200 bg-white rounded-lg shadow-md">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Client
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Account Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Account Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Transaction Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {uniqueReports.map((accounts) => (
                    <tr key={accounts.user_id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {accounts.first_name} {accounts.last_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(accounts.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {accounts.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {accounts.account_number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {accounts.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {accounts.transaction_type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Amount
                          name={accounts.transaction_type}
                          amount={accounts.amount}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : showNoTransactions ? (
            <div className="mt-8 px-4">
              <h2 className="text-3xl text-white font-extrabold text-gray-900 mb-8 text-center">
                Client doesn&apos;t have any transactions yet.
              </h2>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Amount({ name, amount }) {
  switch (name.toLowerCase()) {
    case "external_transfer":
      return <span className="text-red-500">-{amount}€</span>;
    case "internal_transfer":
      return <span className="text-green">+{amount}€</span>;
    case "withdraw":
      return <span className="text-red-500">-{amount}€</span>;
    case "deposit":
      return <span className="text-green">+{amount}€</span>;
    default:
      return <span className="text-green">+{amount}€</span>;
  }
}

Amount.propTypes = {
  name: PropTypes.string,
  amount: PropTypes.number,
};
