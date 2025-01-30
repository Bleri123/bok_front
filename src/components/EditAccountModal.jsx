import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import getToken from "../utils/getToken";

const EditAccountModal = ({ isOpen, onRequestClose, account }) => {
  // Define static status options
  const statusOptions = [
    { id: 1, value: "Active" },
    { id: 2, value: "Inactive" },
  ];

  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    console.log("Account Data:", account);
    if (account) {
      // Set the initial status based on account_status_id
      const initialStatus = statusOptions.find(
        (option) => option.id === account.selectedAccount?.account_status_id
      );
      console.log("statusOptions:", statusOptions);

      console.log("initialStatus:", initialStatus);
      setSelectedStatus(initialStatus ? initialStatus.value : ""); // Set the selected status
    }
  }, [account, statusOptions]);

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleSave = async () => {
    const selectedOption = statusOptions.find(
      (option) => option.value === selectedStatus
    );
    const accountStatusId = selectedOption ? selectedOption.id : null;
    const accountId = account.account_number;
    const token = getToken();

    const response = await fetch(
      "http://localhost:5000/api/accounts/account/status/update",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          account_id: accountId,
          account_status_id: accountStatusId,
        }),
      }
    );

    if (response.ok) {
      // Handle successful response
      onRequestClose();
    } else {
      // Handle error response
      console.error("Failed to update account status");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={{
          overlay: { zIndex: 1000 },
          content: {
            zIndex: 1001,
            width: "500px",
            height: "250px",
            margin: "auto",
          },
        }}
      >
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-center mb-4">Edit Account</h2>
          <select
            value={selectedStatus}
            onChange={handleStatusChange}
            className="w-full p-2 rounded-md border border-gray-300 mb-4"
          >
            {statusOptions.map((option) => (
              <option key={option.id} value={option.value}>
                {option.value}
              </option>
            ))}
          </select>
          <div className="flex gap-2 mt-4 justify-between">
            <button
              onClick={onRequestClose}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

EditAccountModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  account: PropTypes.shape({
    account_number: PropTypes.string,
    account_status_id: PropTypes.string,
    status: PropTypes.string,
    type: PropTypes.string,
    balance: PropTypes.string,
    created_at: PropTypes.string,
  }),
};

export default EditAccountModal;
