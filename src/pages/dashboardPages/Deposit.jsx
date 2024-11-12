import React, { useEffect, useState } from "react";
import { Footer } from "../../components/Footer";
import { DepositModal } from "../../components/DepositModal";

export default function Deposit() {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [credit, setCredit] = useState(() => {
    // Retrieve initial credit amount from local storage or set default
    const savedCredit = localStorage.getItem("credit");
    return savedCredit ? parseFloat(savedCredit) : 400.0;
  });
  const [debit, setDebit] = useState(() => {
    // Retrieve initial debit amount from local storage or set default
    const savedDebit = localStorage.getItem("debit");
    return savedDebit ? parseFloat(savedDebit) : 20.0;
  });
  const [savings, setSavings] = useState(() => {
    // Retrieve initial savings amount from local storage or set default
    const savedSavings = localStorage.getItem("savings");
    return savedSavings ? parseFloat(savedSavings) : 1600.0;
  });
  const [selectedAccount, setSelectedAccount] = useState("");

  useEffect(() => {
    // Save balances to local storage whenever they change
    localStorage.setItem("credit", credit);
    localStorage.setItem("debit", debit);
    localStorage.setItem("savings", savings);
  }, [credit, debit, savings]);

  const toggleModal = (message, account) => {
    setModalMessage(message);
    setSelectedAccount(account);
    setShowModal((prev) => !prev);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const updateAccount = (amount) => {
    if (selectedAccount === "Credit") {
      setCredit(credit + amount);
    } else if (selectedAccount === "Debit") {
      setDebit(debit + amount);
    } else if (selectedAccount === "Savings") {
      setSavings(savings + amount);
    }
  };

  return (
    <div className="flex flex-col w-full h-screen">
      {showModal && (
        <DepositModal
          onClose={handleCloseModal}
          message={modalMessage}
          updateAccount={updateAccount}
        />
      )}
      <div className="flex-grow flex flex-col items-center mt-11">
        <h1 className="mb-1 text-tprimary text-3xl lg:text-5xl">Deposit</h1>
        <div
          id="Cards"
          className="flex flex-col bg-secondary items-center p-4 w-[200px] rounded-md mt-6 md:w-[450px] lg:w-[670px]"
        >
          <div id="card" className="flex flex-col items-center mb-4">
            <button
              onClick={() => toggleModal("Credit", "Credit")}
              className="bg-primary text-white p-2 rounded w-[150px] h-[70px] text-2xl md:w-[350px] md:h-[100px] md:text-3xl lg:w-[450px] lg:text-4xl mt-5"
            >
              Credit
            </button>
            <p className="text-lg md:text-2xl lg:text-3xl">
              {credit.toFixed(2)}€
            </p>
          </div>
          <div id="card" className="flex flex-col items-center mb-4">
            <button
              onClick={() => toggleModal("Debit", "Debit")}
              className="bg-primary text-white p-2 rounded w-[150px] h-[70px] text-2xl md:w-[350px] md:h-[100px] md:text-3xl lg:w-[450px] lg:text-4xl"
            >
              Debit
            </button>
            <p className="text-lg md:text-2xl lg:text-3xl">
              {debit.toFixed(2)}€
            </p>
          </div>
          <div id="card" className="flex flex-col items-center mb-4">
            <button
              onClick={() => toggleModal("Savings", "Savings")}
              className="bg-primary text-white p-2 rounded w-[150px] h-[70px] text-2xl md:w-[350px] md:h-[100px] md:text-3xl lg:w-[450px] lg:text-4xl"
            >
              Savings
            </button>
            <p className="text-lg md:text-2xl lg:text-3xl">
              {savings.toFixed(2)}€
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
