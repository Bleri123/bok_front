import { Navigate, useOutletContext } from "react-router-dom";
import getSelectedAccount from "../../utils/getSelectedAccount";
import { Footer } from "../../components/Footer";
import { useState } from "react";
import { WithdrawModal } from "../../components/Withdrawmodal";

export default function Withdraw() {
  const { error } = getSelectedAccount();
  const { isAdmin } = useOutletContext();
  const [amount, setAmount] = useState(0);
  const [notification, setNotification] = useState("");
  const [selectedButton, setSelectedButton] = useState(null); // Track the selected button

  // Change showModal to a state variable
  const [showModal, setShowModal] = useState(false);

  // Function to toggle the modal
  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal when the close image is clicked
  };

  const handleAmountSelect = (selectedAmount) => {
    setAmount(selectedAmount);
    setNotification("");
    setSelectedButton(selectedAmount); // Set the selected button
  };

  const handleWithdraw = (withdrawnAmount = amount) => {
    if (typeof withdrawnAmount === "number" && withdrawnAmount > 0) {
      setNotification(`Successfully withdrew: ${withdrawnAmount}€`); // Update notification with the withdrawn amount
      setSelectedButton(null); // Reset selected button after withdrawal
    } else {
      setNotification("Invalid amount"); // Handle invalid amount
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
      {/* Use showModal to conditionally render the modal */}
      {showModal && (
        <WithdrawModal onClose={handleCloseModal} onWithdraw={handleWithdraw} />
      )}
      <div className="w-4/5 flex flex-col gap-4 mx-auto">
        <h1 className="text-center text-2xl font-bold text-tprimary mt-6 md:text-4xl md:mb-5">
          Withdrawal
        </h1>
        {notification && (
          <div className="text-tprimary text-sm text-center mb-4 md:text-xl">
            {notification}
          </div>
        )}
        <div className="flex justify-center mb-4 gap-4 xl:gap-36">
          <button
            onClick={() => handleAmountSelect(10)}
            className={`text-white p-3 w-full max-w-[140px] rounded-md md:max-w-[300px] md:h-[70px] md:text-2xl ${
              selectedButton === 10 ? "bg-bttclick" : "bg-primary"
            }`}
          >
            10
          </button>
          <button
            onClick={() => handleAmountSelect(150)}
            className={`text-white p-3 w-full max-w-[140px] rounded-md md:max-w-[300px] md:h-[70px] md:text-2xl ${
              selectedButton === 150 ? "bg-bttclick" : "bg-primary"
            }`}
          >
            150
          </button>
        </div>
        <div className="flex justify-center mb-4 gap-4 xl:gap-36">
          <button
            onClick={() => handleAmountSelect(50)}
            className={`text-white p-3 w-full max-w-[140px] rounded-md md:max-w-[300px] md:h-[70px] md:text-2xl ${
              selectedButton === 50 ? "bg-bttclick" : "bg-primary"
            }`}
          >
            50
          </button>
          <button
            onClick={() => handleAmountSelect(200)}
            className={`text-white p-3 w-full max-w-[140px] rounded-md md:max-w-[300px] md:h-[70px] md:text-2xl ${
              selectedButton === 200 ? "bg-bttclick" : "bg-primary"
            }`}
          >
            200
          </button>
        </div>
        <div className="flex justify-center mb-4 gap-4 xl:gap-36">
          <button
            onClick={() => handleAmountSelect(100)}
            className={`text-white p-3 w-full max-w-[140px] rounded-md md:max-w-[300px] md:h-[70px] md:text-2xl ${
              selectedButton === 100 ? "bg-bttclick" : "bg-primary"
            }`}
          >
            100
          </button>
          <button
            onClick={toggleModal}
            className="bg-primary text-white p-3 w-full max-w-[140px] rounded-md text-sm md:max-w-[300px] md:h-[70px] md:text-2xl"
          >
            Enter Number
          </button>
        </div>
        <button
          onClick={() => handleWithdraw(amount)} // Ensure `amount` is passed correctly
          className="bg-primary text-tprimary p-4 mt-4 w-full max-w-[180px] mx-auto rounded-md text-2xl md:max-w-[400px]"
        >
          Withdraw
        </button>
      </div>
      <Footer />
    </div>
  );
}
