import { Navigate, useOutletContext } from "react-router-dom";
import getSelectedAccount from "../../utils/getSelectedAccount";
import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import getToken from "../../utils/getToken";

export default function Balance() {
  const { error, selectedAccount } = getSelectedAccount();
  const { isAdmin } = useOutletContext();
  const { error: transactionHistoryError } = useTransactionHistory();

  if (isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  if (error || transactionHistoryError) {
    return <h1 className="text-red-500">{error || transactionHistoryError}</h1>;
  }

  return (
    <div className="bg-balancebg2 min-h-screen flex flex-col justify-between overflow-hidden">
      <div className="">
        <div className="bg-balancebg w-screen h-[120px] flex flex-col justify-center items-center overflow-hidden lg:w-[860px] lg:h-[150px] xl:w-[1230px] xl:h-[400px] 2xl:w-screen">
          <div className="flex flex-col items-center justify-center w-full h-full 2xl:translate-x-[-100px]">
            <h1 className="text-3xl font-bold text-white md:text-2xl lg:text-4xl xl:text-5xl text-center">
              Cash / Bank Balance
            </h1>
            <h2 className="text-3xl text-white mt-2 md:text-2xl lg:text-4xl xl:text-5xl text-center 2xl:mt-11">
              {selectedAccount.balance} €
            </h2>
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
      return <span className="text-green-500">+{amount}€</span>;
    case "withdraw":
      return <span className="text-red-500">-{amount}€</span>;
    case "deposit":
      return <span className="text-green-500">+{amount}€</span>;
    default:
      return <span className="text-green-500">+{amount}€</span>;
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
