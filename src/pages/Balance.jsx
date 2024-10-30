import getSelectedAccount from '../utils/getSelectedAccount'

export default function Balance(){
    const {error, selectedAccount} = getSelectedAccount();

    if(error){
        return <h1>{error}</h1>
    }

    return <h1>This is balance {selectedAccount.balance}</h1>
}