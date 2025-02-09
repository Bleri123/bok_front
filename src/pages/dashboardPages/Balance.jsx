import { Navigate, useOutletContext } from "react-router-dom";
import getSelectedAccount from "../../utils/getSelectedAccount";
import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import getToken from "../../utils/getToken";
import useAccounts from "../../utils/useAccounts";

export default function Balance() {
  const { error, selectedAccount } = getSelectedAccount();
  const { accounts } = useAccounts();
  const { isAdmin } = useOutletContext();
  const { error: transactionHistoryError } = useTransactionHistory();

  if (isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  if (error || transactionHistoryError) {
    return <h1 className="text-red-500">{error || transactionHistoryError}</h1>;
  }

  return (
    <div className="bg-balancebg2 min-h-screen flex flex-col justify-between overflow-hidden ">
      <div className="">
        <div className="bg-balancebg w-screen flex flex-col justify-center items-center overflow-hidden lg:w-[860px]  xl:w-[1230px] 2xl:w-screen py-10">
          <div className="flex flex-col items-center justify-center w-full h-full 2xl:translate-x-[-100px]">
            <h1 className="text-3xl font-bold text-white md:text-2xl lg:text-4xl xl:text-5xl text-center mb-8">
              Cash / Bank Balances
            </h1>
            <div className="flex flex-col items-center justify-center w-full">
              {accounts?.map((account) => (
                <div
                  key={account.id}
                  className="w-full text-center max-w-md mb-8"
                >
                  <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {account?.type} Account
                    </h2>
                    <h2 className="text-2xl font-bold text-white">
                      Balance: {parseFloat(account?.balance).toFixed(2)} €
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
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

function useTransactionHistory() {
  const token = getToken();
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getTransactionHistory() {
      try {
        const transactions = await axios.get(
          "http://localhost:5000/api/transactions",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setLoading(false);
        setTransactionHistory(transactions.data);
      } catch (e) {
        setError(e.message);
      }
    }

    getTransactionHistory();
  }, [token]);

  return { transactionHistory, loading, error };
}

Amount.propTypes = {
  name: PropTypes.string,
  amount: PropTypes.number,
};
