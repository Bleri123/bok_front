import { useContext } from "react";
import { SelectedAccountContext } from "../pages/Dashboard";
import useAccounts from "./useAccounts";

export default function useSelectedAccount() {
  const { accounts, error } = useAccounts();
  let { selectedAccountIndex: index } = useContext(SelectedAccountContext);

  if (!index) {
    index = 0;
  }

  if (!accounts || accounts.length === 0) {
    return {
      selectedAccount: null,
      error:
        "No accounts exist for this user. Please contact the administrator.",
      accounts,
    };
  }

  const selectedAccount = accounts[index];

  return { selectedAccount, error, accounts };
}
