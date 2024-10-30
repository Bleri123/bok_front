import { createContext, useEffect } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import axios from 'axios';
import getToken from '../utils/getToken';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

function DashboardDesktop() {
  return (
    <div>
      <DashboardHeader />
    </div>
  );
}

const accountsContext = createContext([]);

export default function Dashboard() {
  const { accounts, error } = useAccounts();
  return (
    <div>
      <accountsContext.Provider value={{ accounts, error }}>
        <DashboardDesktop />
        {/*Outlet osht child si balance psh qyty bahet render*/}
        <Outlet/>
      </accountsContext.Provider>
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
        console.log(response.data);
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
