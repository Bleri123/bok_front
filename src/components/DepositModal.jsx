import React, { useEffect, useState } from "react";

export const DepositModal = ({ onClose, message, selectedAccount, updateAccount }) => {
  const [amount, setAmount] = useState("");

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

  const handleSend = async () => {
    const parsedAmount = parseFloat(amount.replace(",", ".")); // Convert to float
    if (!isNaN(parsedAmount) && parsedAmount > 0) {
      updateAccount(parsedAmount); // Update the selected account
      setAmount(""); // Clear the input
      onClose(); // Close the modal after sending
    } else {
      alert("Please enter a valid amount.");
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
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter Number"
              className="border border-gray-950 rounded-md p-2 w-[200px] text-center md:w-[250px] md:text-xl"
            />
            <button
              onClick={handleSend}
              className="bg-primary text-white p-2 rounded w-[200px] mt-4 mb-6 md:h-[50px] md:text-xl"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
