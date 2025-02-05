import axios from "axios";
import { useEffect, useState } from "react";
import getToken from "../../utils/getToken";
import PropTypes from "prop-types";

const getLastMonthDate = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  return date.toISOString().split("T")[0];
};

const getDaysDate = (days) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split("T")[0];
};

export default function Reports() {
  const [chosedOption, setChosedOption] = useState("7days");
  const [activeUser, setActiveUser] = useState([]);
  const [chosedUser, setChosedUser] = useState(0);
  const [user_report, setUserReport] = useState([]);
  const [showNoTransactions, setShowNoTransactions] = useState(false);

  async function fetchSpendingData() {
    const token = getToken();
    const res = await axios.get(
      "http://localhost:5000/api/accounts/admin/user-report",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          user_id: chosedUser,
          filter: chosedOption,
        },
      }
    );
    setUserReport(res.data);
    if (res.data.length === 0) {
      setShowNoTransactions(true);
    } else {
      setShowNoTransactions(false);
    }
  }

  async function getActiveUser() {
    const token = getToken();
    const res = await axios.get(
      "http://localhost:5000/api/users/active-users",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setActiveUser(res.data);
    if (res.data.length > 0) {
      setChosedUser(res.data[0].id);
    }
  }
  useEffect(() => {
    getActiveUser();
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    console.log("value", value);
    setChosedOption(value);
  };

  const handleUserChange = (event) => {
    const value = event.target.value;
    console.log("value", value);
    setChosedUser(value);
  };

  const handleSubmit = () => {
    console.log("chosedUser", chosedUser);
    console.log("chosedOption", chosedOption);

    fetchSpendingData();
  };
  return (
    <div className="min-h-screen w-full py-8 sm:py-12 overflow-x-hidden">
      <div className="w-full max-w-md mx-auto px-4 relative">
        <h1 className="text-2xl sm:text-3xl font-bold text-tprimary mb-6 text-center">
          Reports
        </h1>

        <div className="mb-6 flex flex-col items-center">
          <div className="flex justify-between mb-4">
            <select
              className="w-[200px] p-3 text-gray-700 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mr-4"
              onChange={handleChange}
            >
              <option value="7days">Last 7 days</option>
              <option value="14days">Last 14 days</option>
              <option value="1month">This month</option>
            </select>

            <select
              className="w-[200px] p-3 text-gray-700 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={handleUserChange}
            >
              {activeUser.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.first_name} {user.last_name}
                </option>
              ))}
            </select>
          </div>
          <button
            className="px-4 py-2 bg-primary text-white rounded-xl w-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>

      {user_report?.length > 0 ? (
        <div className="mt-8 px-4">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8"></h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 bg-white rounded-lg shadow-md">
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
                    Account
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
                {user_report.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {transaction.first_name} {transaction.last_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(transaction.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.account_type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.account_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.transaction_type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Amount
                        name={transaction.transaction_type}
                        amount={transaction.amount}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : showNoTransactions ? (
        <div className="mt-8 px-4">
          <h2 className="text-3xl text-white font-extrabold text-gray-900 mb-8 text-center">
            Client doesn't have any transactions yet.
          </h2>
        </div>
      ) : null}
    </div>
  );
}

function Amount({ name, amount }) {
  switch (name.toLowerCase()) {
    case "external_transfer":
      return <span className="text-red-500">-{amount}€</span>;
    case "internal_transfer":
      return <span className="text-green-500">+{amount}€</span>;
    case "withdraw":
      return <span className="text-red-500">-{amount}€</span>;
    case "deposit":
      return <span className="text-green-500">+{amount}€</span>;
    default:
      return <span className="text-green-500">+{amount}€</span>;
  }
}

Amount.propTypes = {
  name: PropTypes.string,
  amount: PropTypes.number,
};
