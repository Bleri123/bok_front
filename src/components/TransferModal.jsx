import React, { useEffect, useState } from "react";
import axios from "axios";
import getToken from "../utils/getToken";
import toast from "react-hot-toast";
export const TransferModal = ({
  onClose,
  message,
  selectedAccount,
  selectedAccountType,
  accountAmount,
  onSuccess,
}) => {
  const [receiver_account_number, setReceiver_account_number] = useState("");
  const [amount, setAmount] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isValidResponse, setIsValidResponse] = useState(false);
  const [amountExceedsLimit, setAmountExceedsLimit] = useState(false);
  const [amountExceedsLimitMessage, setAmountExceedsLimitMessage] =
    useState("");

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleCheckIfAccountExits = async () => {
    const token = getToken();
    if (receiver_account_number.length === 16) {
      setIsLoading(true);
      setIsInvalid(false);
      setIsValidResponse(false);
      try {
        const response = await axios.post(
          "http://localhost:5000/api/accounts/check-account/account-number",
          {
            receiver_account_number: receiver_account_number,
            sender_account_number: selectedAccountType.account_number,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data.length > 0) {
          setIsValidResponse(true);
        } else if (response.data.error_message === "Account does not exist.") {
          setIsInvalid(true);
          toast.error("Account does not exist.");
        } else if (
          response.data.error_message ===
          "Cannot send money to the same account."
        ) {
          setIsInvalid(true);
          toast.error("Cannot send money to the same account.");
        } else {
          setIsInvalid(true);
          toast.error("Something went wrong!");
        }
      } catch (error) {
        console.error("Error checking account existence:", error);
        if (error.response && error.response.status === 404) {
          toast.error(error.response.data.error_message);
          setIsInvalid(true);
        } else {
          toast.error("An unexpected error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Please enter a valid 16-digit account number.");
    }
  };

  useEffect(() => {
    if (receiver_account_number.length === 16) {
      setIsButtonDisabled(false);
      handleCheckIfAccountExits();
    } else {
      setIsButtonDisabled(true);
    }
  }, [receiver_account_number]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    if (value.length <= 16) {
      setReceiver_account_number(value);
    }
  };

  const handleAmountChange = (e) => {
    const { value } = e.target;
    setAmount(value);
    if (parseFloat(value) > parseFloat(accountAmount)) {
      setAmountExceedsLimit(true);
      setAmountExceedsLimitMessage("Amount exceeds account limit.");
    } else {
      setAmountExceedsLimit(false);
      setAmountExceedsLimitMessage("");
    }
  };

  const handleSendMoney = async () => {
    const token = getToken();

    try {
      await axios.post(
        "http://localhost:5000/api/transactions/send-money",
        {
          receiver_account_number: receiver_account_number,
          sender_account_number: selectedAccountType.account_number,
          amount: amount,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Transaction successful.");
      onSuccess();
    } catch (error) {
      console.error("Error sending money:", error);
      if (error.response && error.response.data.details) {
        toast.error(`Internal server error: ${error.response.data.details}`);
      } else {
        toast.error("Internal server error");
      }
    }
  };

  return (
    <div
      className="relative z-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="w-[90%] max-w-md relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 flex flex-col items-center justify-center gap-4 lg:h-[400px]">
            <img
              src="/images/close.png"
              className="absolute top-2 right-2 cursor-pointer w-6"
              alt="close"
              onClick={onClose}
            />
            <h2 className="text-lg font-semibold text-center mt-2 md:text-2xl">
              {selectedAccount}
            </h2>
            <h2 className="text-2xl font-bold text-center md:text-3xl lg:mb-5">
              {message}
            </h2>
            <input
              type="number"
              value={receiver_account_number}
              onChange={handleInputChange}
              placeholder="Enter 16-digit account number"
              className={`border ${
                isInvalid
                  ? "border-red-500"
                  : isFocused && receiver_account_number.length !== 16
                  ? "border-red-500"
                  : isValidResponse
                  ? "border-green"
                  : "border-gray-950"
              } rounded-md p-2 w-[200px] text-center md:w-[250px] md:text-xl`}
              maxLength={16}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={isLoading}
            />
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount"
              className={`border ${
                amountExceedsLimit ? "border-red-500" : "border-gray-950"
              } rounded-md p-2 w-[200px] text-center md:w-[250px] md:text-xl`}
              disabled={isLoading}
            />
            {amountExceedsLimit && (
              <p className="text-red-500 text-sm mt-1">
                {amountExceedsLimitMessage}
              </p>
            )}
            <button
              onClick={handleSendMoney}
              disabled={isButtonDisabled || isLoading || amountExceedsLimit}
              className={` text-white p-2 rounded w-[200px] mt-4 mb-6 md:h-[50px] md:text-xl ${
                isLoading
                  ? "opacity-50"
                  : isButtonDisabled || amountExceedsLimit
                  ? "bg-gray-300 cursor-not-allowed text-gray-500"
                  : "bg-primary text-white cursor-pointer"
              }`}
            >
              {isLoading ? "Checking..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
