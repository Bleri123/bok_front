import { createContext, useEffect } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import axios from 'axios';
import getToken from '../utils/getToken';
import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import DashboardSideBar from '../components/DashboardSideBar';

export const AccountsContext = createContext([]);
export const SelectedAccountContext = createContext(null);

export default function Dashboard() {
  const { accounts, error } = useAccounts();
  const [selectedAccountIndex, setSelectedAccountIndex] = useState(0);

  if (!getToken()) {
    return <Navigate to="/" replace></Navigate>;
  }

  return (
    <div>
      <AccountsContext.Provider value={{ accounts, error }}>
        <SelectedAccountContext.Provider
          value={{ selectedAccountIndex, setSelectedAccountIndex }}
        >
          <DashboardHeader />
          <div className='flex min-h-full bg-green-200'>
            <DashboardSideBar />
            {/*QYTY BAHET RENDER CHILD PSH WITHDRAW*/}
            <Outlet />
          </div>
        </SelectedAccountContext.Provider>
      </AccountsContext.Provider>
    </div>
  );
}

// DONT JUDGE ME THIS IS THE BEST CODE IN HUMAN EXISTANCE
function useAccounts() {
  const [accounts, setAccounts] = useState(null);
  const [error, setError] = useState(null);
  const token = getToken();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function getAccounts() {
      try {
        const response = await axios.get('http://localhost:5000/api/accounts', {
          headers: { Authorization: `Bearer ${token}` },
          signal,
        });
        setAccounts(response.data);
      } catch (e) {
        if (e.name === 'CanceledError') {
          console.log('Fetch canceled');
        } else {
          setError(e);
        }
      }
    }

    getAccounts();

    return () => {
      controller.abort();
    };
  }, [token]);

  return { accounts, error };
}
