import { Navigate, useOutletContext } from "react-router-dom";
import getSelectedAccount from "../../utils/getSelectedAccount";
import { useEffect, useState } from "react";
import { DepositModal } from "../../components/DepositModal";
import axios from "axios";
import getToken from "../../utils/getToken";

export default function Deposit() {
  const { error } = getSelectedAccount();
  const { isAdmin } = useOutletContext();
  const [amount, setAmount] = useState(0);
  const [notification, setNotification] = useState("");
  const [notificationStatus, setNotificationStatus] = useState("");
  const [selectedButton, setSelectedButton] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userAccounts, setUserAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const token = getToken();

  const getUserAccounts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/accounts/logged/user",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUserAccounts(response?.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getUserAccounts();
  }, []);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAmountSelect = (selectedAmount) => {
    setAmount(selectedAmount);
    setNotification("");
    setNotificationStatus("");
    setSelectedButton(selectedAmount);
  };

  const handleAccountSelect = (account) => {
    setSelectedAccount(account);
  };

  const handleDeposit = async (depositedAmount = amount) => {
    if (typeof depositedAmount === "number" && depositedAmount > 0) {
      const data = {
        chosen_value: depositedAmount,
        account_type_id: selectedAccount?.account_type_id,
      };

      try {
        const response = await axios.post(
          "http://localhost:5000/api/accounts/user/deposit",
          data,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setNotificationStatus("success");
        setNotification(
          response?.data?.message ||
            `Successfully deposited: ${depositedAmount}€`
        );

        setSelectedButton(null);
      } catch (error) {
        setNotificationStatus("error");
        setNotification(
          error?.response?.data?.message || "An error has occurred"
        );
      }
    } else {
      setNotificationStatus("error");
      setNotification("Invalid amount");
    }
  };

  if (isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  if (error) {
    return <h1 className="text-red-500">{error}</h1>;
  }

  return (
    <div className="bg-balancebg2 min-h-screen w-[100vw] flex flex-col justify-between overflow-hidden">
      {showModal && (
        <DepositModal onClose={handleCloseModal} onDeposit={handleDeposit} />
      )}
      <div className="w-4/5 flex flex-col gap-4 mx-auto">
        <h1 className="text-center text-2xl font-bold text-tprimary mt-6 md:text-4xl md:mb-5">
          Deposit
        </h1>

        {notification && (
          <div
            className={`${
              notificationStatus === "success" ? "text-green" : "text-red-500"
            } text-sm text-center mb-4 md:text-xl`}
          >
            {notification}
          </div>
        )}
        <div className="mb-4 flex mx-16">
          <select
            value={selectedAccount?.account_type_id}
            onChange={(e) =>
              handleAccountSelect(
                userAccounts.find(
                  (account) =>
                    account.account_type_id === parseInt(e.target.value)
                )
              )
            }
            className="form-select block w-full h-[30px] mt-1 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Select an account</option>
            {userAccounts.map((account) => (
              <option
                key={account.account_type_id}
                value={account.account_type_id}
              >
                {account.account_number} - {account.type}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center mb-4 gap-4 xl:gap-36">
          <button
            onClick={() => handleAmountSelect(10)}
            className={`text-white  p-3 w-full max-w-[140px] rounded-md md:max-w-[300px] md:h-[70px] md:text-2xl ${
              showModal
                ? "bg-primary"
                : selectedButton === 10
                ? "bg-bttclick"
                : "bg-primary"
            }`}
          >
            10
          </button>
          <button
            onClick={() => handleAmountSelect(150)}
            className={`text-white p-3 w-full max-w-[140px] rounded-md md:max-w-[300px] md:h-[70px] md:text-2xl ${
              showModal
                ? "bg-primary"
                : selectedButton === 150
                ? "bg-bttclick"
                : "bg-primary"
            }`}
          >
            150
          </button>
        </div>
        <div className="flex justify-center mb-4 gap-4 xl:gap-36">
          <button
            onClick={() => handleAmountSelect(50)}
            className={`text-white p-3 w-full  max-w-[140px] rounded-md md:max-w-[300px] md:h-[70px] md:text-2xl ${
              showModal
                ? "bg-primary"
                : selectedButton === 50
                ? "bg-bttclick"
                : "bg-primary"
            }`}
          >
            50
          </button>
          <button
            onClick={() => handleAmountSelect(200)}
            className={`text-white p-3 w-full max-w-[140px] rounded-md md:max-w-[300px] md:h-[70px] md:text-2xl ${
              showModal
                ? "bg-primary"
                : selectedButton === 200
                ? "bg-bttclick"
                : "bg-primary"
            }`}
          >
            200
          </button>
        </div>
        <div className="flex justify-center mb-4 gap-4 xl:gap-36">
          <button
            onClick={() => handleAmountSelect(100)}
            className={`text-white p-3 w-full max-w-[140px] rounded-md md:max-w-[300px] md:h-[70px] md:text-2xl ${
              showModal
                ? "bg-primary"
                : selectedButton === 100
                ? "bg-bttclick"
                : "bg-primary"
            }`}
          >
            100
          </button>
          <button
            onClick={toggleModal}
            className={`bg-primary text-white p-3 w-full max-w-[140px] rounded-md text-sm md:max-w-[300px] md:h-[70px] md:text-2xl`}
          >
            Enter Number
          </button>
        </div>

        <button
          onClick={() => handleDeposit(amount)}
          className="bg-primary text-tprimary p-4 mt-4 w-full max-w-[180px] mx-auto rounded-md text-2xl md:max-w-[400px]"
        >
          Deposit
        </button>
      </div>
    </div>
  );
}
