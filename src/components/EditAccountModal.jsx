import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import getToken from "../utils/getToken";
import axios from "axios";

const EditAccountModal = ({
  isOpen,
  onRequestClose,
  account,
  fetchAccounts,
}) => {
  // Define static status options
  const statusOptions = [
    { id: 1, value: "Active" },
    { id: 2, value: "Inactive" },
  ];

  const [selectedStatus, setSelectedStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (account) {
      const initialStatus = statusOptions.find(
        (option) => option.id === account.account_status_id
      );
      setSelectedStatus(initialStatus ? initialStatus.value : "");
    }
  }, [account]);

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleSave = async () => {
    setIsLoading(true);
    const selectedOption = statusOptions.find(
      (option) => option.value === selectedStatus
    );
    const accountStatusId = selectedOption ? selectedOption.id : null;
    const accountId = account.account_number;

    console.log("Sending data:", {
      account_id: accountId,
      account_status_id: accountStatusId,
    });

    const token = getToken();

    try {
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
        console.log("Account status updated successfully");
        fetchAccounts();
        onRequestClose();
      } else {
        const errorData = await response.json();
        console.error("Failed to update account status", errorData);
      }
    } catch (error) {
      console.error("Error updating account status", error);
    } finally {
      setIsLoading(false);
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
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
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
