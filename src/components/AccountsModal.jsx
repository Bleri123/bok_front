import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import getToken from "../utils/getToken";
import AddAccountTypeModal from "./AddAccountTypeModal";
import EditAccountModal from "./EditAccountModal";

export default function AccountsModal({ userId, isVisible, setIsVisible }) {
  const [accounts, setAccounts] = useState([]);
  const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const fetchAccounts = async () => {
    const token = getToken();
    const res = await axios.get("http://localhost:5000/api/accounts/all", {
      headers: { Authorization: `Bearer ${token}` },
      params: { userId },
    });
    console.log(res.data);
    setAccounts(res.data);
  };

  useEffect(() => {
    fetchAccounts();
  }, [userId]);

  const closeModal = () => {
    setIsVisible(false);
  };

  // Add this function to check if user has all account types
  const hasAllAccountTypes = () => {
    console.log("dsaad", accounts);
    const accountTypeSet = new Set(
      accounts.map((account) => account.type.toLowerCase())
    );

    return (
      accountTypeSet.has("debit") &&
      accountTypeSet.has("credit") &&
      accountTypeSet.has("savings")
    );
  };

  const handleEditClick = (account) => {
    setSelectedAccount(account);
    setIsEditModalOpen(true);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#2a3447] rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative p-6">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-white text-2xl"
        >
          &times;
        </button>
        <h2 className="text-white text-2xl font-semibold">Accounts</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#1e2836] text-gray-400 uppercase">
              <tr>
                <th className="py-3 px-4">Account Number</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Balance</th>
                <th className="py-3 px-4">Created At</th>
                <th className="py-3 px-4 text-center">
                  <div>
                    {!hasAllAccountTypes() && (
                      <button
                        onClick={() => setIsAddAccountModalOpen(true)}
                        className="bg-balancebg2 w-[70px] text-white rounded "
                        title="Add new account"
                      >
                        +
                      </button>
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {accounts.length > 0 ? (
                accounts.map(
                  ({
                    account_id,
                    account_number,
                    account_status_id,
                    status,
                    type,
                    balance,
                    created_at,
                  }) => (
                    <tr
                      key={account_number}
                      className="bg-[#243045] hover:bg-[#2a3c55] transition-colors"
                    >
                      <td className="py-3 px-4">{account_number}</td>
                      <td className="py-3 px-4">{status}</td>
                      <td className="py-3 px-4">{type}</td>
                      <td className="py-3 px-4">
                        ${Number(balance).toFixed(2)}
                      </td>
                      <td className="py-3 px-4">
                        {new Date(created_at).toLocaleDateString()}
                      </td>
                      <td className="text-center">
                        <button
                          onClick={() =>
                            handleEditClick({
                              account_id,
                              account_number,
                              account_status_id,
                              status,
                              type,
                              balance,
                              created_at,
                            })
                          }
                          className="text-tprimary bg-primary w-[70px] h-[25px] rounded hover:text-blue-800"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-gray-400 text-center py-3 px-4"
                  >
                    No accounts found for this user.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {isAddAccountModalOpen && (
          <AddAccountTypeModal
            isOpen={isAddAccountModalOpen}
            onRequestClose={() => setIsAddAccountModalOpen(false)}
            user_id={userId}
            fetchAccounts={fetchAccounts}
          />
        )}
        <EditAccountModal
          isOpen={isEditModalOpen}
          onRequestClose={() => setIsEditModalOpen(false)}
          account={selectedAccount}
          fetchAccounts={fetchAccounts}
        />
      </div>
    </div>
  );
}

AccountsModal.propTypes = {
  userId: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  setIsVisible: PropTypes.func.isRequired,
};
