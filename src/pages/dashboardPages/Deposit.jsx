import { useEffect, useState } from "react";
import { DepositModal } from "../../components/DepositModal";
import useAccounts from "../../utils/useAccounts";
import useSelectedAccount from "../../utils/getSelectedAccount";
import axios from "axios";
import getToken from "../../utils/getToken";
import PropTypes from "prop-types";

export default function Deposit() {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [credit, setCredit] = useState(null);
  const [savings, setSavings] = useState(null);
  const [debit, setDebit] = useState(null);
  const { accounts, error } = useAccounts();
  const { selectedAccount } = useSelectedAccount();

  useEffect(() => {
    if (accounts) {
      setCredit(
        accounts.find((account) => account.type.toLowerCase() === "credit")
      );
      setSavings(
        accounts.find((account) => account.type.toLowerCase() === "savings")
      );
      setDebit(
        accounts.find((account) => account.type.toLowerCase() === "debit")
      );
    }
  }, [accounts]);

  if (error) {
    return <h1>Error loading accounts</h1>;
  }

  const deposit = async (amount) => {
    const token = getToken();
    try {
      await axios.post(
        "http://localhost:5000/api/transactions/deposit",
        { amount: amount, account_id: selectedAccount.account_id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (e) {
      if (e.response?.data) {
        alert(`Error: ${e.response.data}`);
      } else {
        alert("An unexpected error occurred");
      }
    }

    axios.post();
  };

  const toggleModal = (message) => {
    setModalMessage(message);
    setShowModal((prev) => !prev);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col w-full h-screen">
      {showModal && (
        <DepositModal
          onClose={handleCloseModal}
          message={modalMessage}
          selectedAccount={selectedAccount.type}
          updateAccount={deposit}
        />
      )}
      <div className="flex-grow flex flex-col items-center mt-11">
        <h1 className="mb-1 text-tprimary text-3xl lg:text-5xl">Deposit</h1>
        <div
          id="Cards"
          className="flex flex-col bg-secondary items-center p-10 w-[200px] rounded-md mt-6 md:w-[450px] lg:w-[670px]"
        >
          <Card
            amount={Number(credit?.balance)}
            text={"Credit"}
            toggleModal={toggleModal}
            accountType={"Credit"}
          />
          <Card
            amount={Number(savings?.balance)}
            text={"Savings"}
            accountType={"Savings"}
            toggleModal={toggleModal}
          />
          <Card
            amount={Number(debit?.balance)}
            text={"Debit"}
            accountType={"Debit"}
            toggleModal={toggleModal}
          />
        </div>
      </div>
    </div>
  );
}

function Card({ toggleModal, amount, text, accountType }) {
  if (!amount) {
    return null;
  }

  return (
    <div id="card" className="flex flex-col items-center mb-4">
      <button
        onClick={() => toggleModal(accountType)}
        className="bg-primary text-white p-2 rounded w-[150px] h-[70px] text-2xl md:w-[350px] md:h-[100px] md:text-3xl lg:w-[450px] lg:text-4xl"
      >
        {text}
      </button>
      <p className="text-lg md:text-2xl lg:text-3xl">{amount}€</p>
    </div>
  );
}

Card.propTypes = {
  toggleModal: PropTypes.func,
  amount: PropTypes.number,
  text: PropTypes.string,
  accountType: PropTypes.string,
};
