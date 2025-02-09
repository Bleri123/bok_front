import { useEffect, useState } from "react";
import { TransferModal } from "../../components/TransferModal";
import useAccounts from "../../utils/useAccounts";
import useSelectedAccount from "../../utils/getSelectedAccount";
import axios from "axios";
import getToken from "../../utils/getToken";
import PropTypes from "prop-types";

export default function Transfer() {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [credit, setCredit] = useState(null);
  const [savings, setSavings] = useState(null);
  const [debit, setDebit] = useState(null);
  const { accounts, error, refetch } = useAccounts();
  const { error: accountError, selectedAccount } = useSelectedAccount();
  const [selectedAccountType, setSelectedAccountType] = useState(null);
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

  if (accountError) {
    return <h1 className="text-red-500">{accountError}</h1>;
  }

  const toggleModal = (message, accountType) => {
    setModalMessage(message);
    setShowModal((prev) => !prev);
    setSelectedAccountType(accountType);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col w-full h-screen">
      {showModal && (
        <TransferModal
          onClose={handleCloseModal}
          message={modalMessage}
          selectedAccount={selectedAccount.type}
          selectedAccountType={selectedAccountType}
          accountAmount={selectedAccountType?.balance}
          onSuccess={() => {
            refetch();
            handleCloseModal();
          }}
        />
      )}
      <div className="flex-grow flex flex-col items-center mt-11">
        <h1 className="mb-1 text-tprimary text-3xl lg:text-5xl">Transfer</h1>
        <div
          id="Cards"
          className="flex flex-col bg-secondary items-center p-10 w-[200px] rounded-md mt-6 md:w-[450px] lg:w-[670px]"
        >
          <Card
            amount={Number(credit?.balance)}
            accountData={credit}
            text={"Credit"}
            toggleModal={(message) => toggleModal(message, credit)}
            accountType={"Credit"}
            setSelectedAccountType={setSelectedAccountType}
          />
          <Card
            amount={Number(savings?.balance)}
            accountData={savings}
            text={"Savings"}
            accountType={"Savings"}
            toggleModal={(message) => toggleModal(message, savings)}
            setSelectedAccountType={setSelectedAccountType}
          />
          <Card
            amount={Number(debit?.balance)}
            accountData={debit}
            text={"Debit"}
            accountType={"Debit"}
            toggleModal={(message) => toggleModal(message, debit)}
            setSelectedAccountType={setSelectedAccountType}
          />
        </div>
      </div>
    </div>
  );
}

function Card({
  toggleModal,
  amount,
  text,
  accountType,
  accountData,
  setSelectedAccountType,
}) {
  if (!amount) {
    return null;
  }

  const handleClick = () => {
    setSelectedAccountType(accountData);
    toggleModal(accountType);
  };

  return (
    <div id="card" className="flex flex-col items-center mb-4">
      <button
        onClick={handleClick}
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
  accountData: PropTypes.object,
  setSelectedAccountType: PropTypes.func,
};
