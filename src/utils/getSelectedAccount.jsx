import { useContext } from 'react';
import { AccountsContext, SelectedAccountContext } from '../pages/Dashboard';

export default function useSelectedAccount(){
    const { accounts, error } = useContext(AccountsContext);
    const { selectedAccountIndex: index } = useContext(SelectedAccountContext);

    if(!accounts){
        return {selectedAccount: null, error: 'No accounts exist for this user', accounts}
    }
    
    const selectedAccount = accounts[index];

    return {selectedAccount, error, accounts};
}