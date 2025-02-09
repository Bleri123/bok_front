import React, { useEffect, useState } from "react";

export const DepositModal = ({ onClose, onWithdraw }) => {
  const [amount, setAmount] = useState(""); // State to hold the input amount

  const handleWithdraw = () => {
    const numericAmount = parseFloat(amount); // Parse the input as a number
    if (!isNaN(numericAmount) && numericAmount > 0) {
      onWithdraw(numericAmount); // Pass the custom amount back to Withdraw
      setAmount(""); // Clear the input
      onClose(); // Close the modal
    } else {
      alert("Please enter a valid amount."); // Handle invalid input in the modal
    }
  };

  // Effect to handle keydown event for closing the modal
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose(); // Call onClose when ESCAPE is pressed
      }
    };

    // Add event listener
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]); // Dependency array includes onClose

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
          <div className="w-[80%] relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 flex flex-col items-center justify-center gap-4 md:w-[50%]">
            <img
              src="/images/close.png"
              className="absolute top-2 right-4 cursor-pointer w-4"
              alt="close"
              onClick={onClose}
            />
            <div className="bg-drawmodal px-10 py-8 w-[100%] lg:h-[300px] lg:flex lg:justify-center">
              <div className="sm:flex sm:items-start flex flex-col justify-center md:items-center gap-4">
                <h3
                  className="text-[12px] text-center text-gray-900"
                  id="modal-title"
                >
                  <input
                    type="number"
                    placeholder="Enter Number"
                    className="text-center text-base border-2 border-primary w-full h-[50px] max-w-[180px] rounded bg-primary text-tprimary placeholder:text-tprimary md:h-[60px] lg:text-2xl lg:max-w-[500px] lg:h-[70px]"
                    value={amount} // Bind input value to state
                    onChange={(e) => setAmount(e.target.value)} // Update state on input change
                  />
                </h3>

                <p className="text-sm text-center text-gray-500">
                  <button
                    onClick={() => handleWithdraw()}
                    className="bg-primary text-tprimary p-4 mt-4 w-full max-w-[180px] mx-auto rounded-md text-xl md:w-[500px] md:text-xl lg:text-2xl lg:max-w-[300px] lg:h-[70px]"
                  >
                    Withdraw
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
