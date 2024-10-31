import { Navigate, useOutletContext } from 'react-router-dom';
import getSelectedAccount from '../../utils/getSelectedAccount';

export default function Balance() {
  const { error, selectedAccount } = getSelectedAccount();
   const { isAdmin } = useOutletContext();

   if (isAdmin) {
     return <Navigate to="/dashboard" replace />;
   }

  if (error) {
    return <h1>{error}</h1>;
  }

  return <h1>This is balance {selectedAccount.balance}</h1>;
}