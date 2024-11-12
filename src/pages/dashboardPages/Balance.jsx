import { Navigate, useOutletContext } from 'react-router-dom';
import getSelectedAccount from '../../utils/getSelectedAccount';
import { Footer } from '../../components/Footer';
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import getToken from '../../utils/getToken';

export default function Balance() {
  const { error, selectedAccount } = getSelectedAccount();
  const { isAdmin } = useOutletContext();
  const {
    transactionHistory,
    loading,
    error: transactionHistoryError,
  } = useTransactionHistory();

  if (isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  if (error || transactionHistoryError) {
    return <h1 className="text-red-500">{error || transactionHistoryError}</h1>;
  }

  return (
    <div className="bg-balancebg2 min-h-screen flex flex-col justify-between overflow-hidden">
      <div className="flex-grow">
        <div className="bg-balancebg w-screen h-[120px] flex flex-col justify-center items-center overflow-hidden lg:w-[860px] lg:h-[150px] xl:w-[1230px] xl:h-[200px] 2xl:w-screen">
          <div className="flex flex-col items-center justify-center w-full h-full 2xl:translate-x-[-100px]">
            <h1 className="text-3xl font-bold text-white md:text-2xl lg:text-4xl xl:text-5xl text-center">
              Cash / Bank Balance
            </h1>
            <h2 className="text-3xl text-white mt-2 md:text-2xl lg:text-4xl xl:text-5xl text-center 2xl:mt-11">
              {selectedAccount.balance} €
            </h2>
          </div>
        </div>
        {loading ? (
          <p>loading...</p>
        ) : (
          <div className="mt-4 px-4 flex flex-col justify-center items-center w-full">
            {transactionHistory.map(({ amount, name, fixed_fee, id }) => {
              return (
                <Fragment key={id}>
                  <div className="border-b-2 border-gray-300 w-full my-2" />
                  <div className="flex flex-row justify-between w-full pb-2">
                    <p className="text-tprimary flex-1 pr-2 text-md lg:text-xl xl:text-3xl">
                      {name.split('_').join(' ').toLowerCase()}{' '}
                      <Amount name={name} amount={Number(amount)} />
                    </p>
                    <div className="border-l-2 border-gray-300 h-6 mx-2" />
                    <p className="text-tprimary flex-1 pl-2 text-md lg:text-xl xl:text-3xl">
                      Bank Fee{' '}
                      <span className={`${fixed_fee !== 0 && 'text-red-500'}`}>
                        {fixed_fee === 0 ? fixed_fee : -fixed_fee}€
                      </span>
                    </p>
                  </div>
                </Fragment>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

function Amount({ name, amount }) {
  switch (name.toLowerCase()) {
    case 'external_transfer':
      return <span className="text-red-500">-{amount}€</span>;
    case 'internal_transfer':
      return <span className="text-green-500">+{amount}€</span>;
    case 'withdraw':
      return <span className="text-red-500">-{amount}€</span>;
    case 'deposit':
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
          'http://localhost:5000/api/transactions',
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
