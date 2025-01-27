import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import getToken from "../utils/getToken";
import AddAccountTypeModal from "./AddAccountTypeModal";

export default function AccountsModal({ userId, isVisible, setIsVisible }) {
  const [accounts, setAccounts] = useState([]);
  const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false);

  useEffect(() => {
    const fetchAccounts = async () => {
      const token = getToken();
      const res = await axios.get("http://localhost:5000/api/accounts/all", {
        headers: { Authorization: `Bearer ${token}` },
        params: { userId },
      });
      console.log(res.data);
      setAccounts(res.data);
    };

    fetchAccounts();
  }, [userId]);

  const closeModal = () => {
    setIsVisible(false);
  };

  // Add this function to check if user has all account types
  const hasAllAccountTypes = () => {
    const accountTypeSet = new Set(
      accounts.map((account) => account.type.toLowerCase())
    );
    return (
      accountTypeSet.has("debit") &&
      accountTypeSet.has("credit") &&
      accountTypeSet.has("savings")
    );
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
        {accounts.length > 0 ? (
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
                          className="bg-balancebg2 w-[70px] text-white rounded hover:bg-blue-600"
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
                {accounts.map(
                  ({ account_number, status, type, balance, created_at }) => (
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
                        <button className="bg-primary rounded w-[70px]">
                          Edit
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-400 text-center mt-4">
            No accounts found for this user.
          </p>
        )}
        {isAddAccountModalOpen && (
          <AddAccountTypeModal
            isOpen={isAddAccountModalOpen}
            onRequestClose={() => setIsAddAccountModalOpen(false)}
            user_id={userId}
          />
        )}
      </div>
    </div>
  );
}

AccountsModal.propTypes = {
  userId: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  setIsVisible: PropTypes.func.isRequired,
};
