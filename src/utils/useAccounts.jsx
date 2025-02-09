import axios from "axios";
import { useEffect, useState } from "react";
import getToken from "./getToken";

export default function useAccounts() {
  const [accounts, setAccounts] = useState(null);
  const [error, setError] = useState(null);
  const token = getToken();

  async function getAccounts(signal) {
    try {
      const response = await axios.get("http://localhost:5000/api/accounts", {
        headers: { Authorization: `Bearer ${token}` },
        signal,
      });

      setAccounts(response.data);
    } catch (e) {
      if (e.name === "CanceledError") {
        console.log("Fetch canceled");
      } else {
        setError(e);
      }
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    getAccounts(signal);

    return () => {
      controller.abort();
    };
  }, [token]);

  return { accounts, error, refetch: getAccounts };
}
