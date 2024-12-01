import React, { useState } from "react";
import ConfirmRemoveUserModal from "./ConfirmRemoveUserModal";
import EditUserDetailsModal from "./EditUserDetailsModal";
import EditStatusModal from "./EditStatusModal";
import axios from "axios";
import getToken from "../utils/getToken";
import toast from "react-hot-toast";

const EditUserModal = ({ user, onClose, onSave }) => {
  const [isConfirmRemoveOpen, setIsConfirmRemoveOpen] = useState(false);
  const [isEditUserDetailsOpen, setIsEditUserDetailsOpen] = useState(false);
  const [isEditStatusOpen, setIsEditStatusOpen] = useState(false);

  const handleRemoveUser = () => {
    setIsConfirmRemoveOpen(true);
  };
  const handleConfirmRemove = async () => {
    try {
      console.log("User removed:", user);
      const token = getToken();

      const res = await axios.put(
        `http://localhost:5000/api/users/set/user/inactive/${user?.id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("res: ", res);
      onClose();
      toast.success("User successfully updated", {
        duration: 4000,
        position: "top-right",
      });
    } catch (error) {
      console.error("Error removing user:", error);
    }
  };

  const handleEditUserDetails = (updatedUser) => {
    console.log("User details updated:", updatedUser);
    setIsEditUserDetailsOpen(false);
    onSave(updatedUser);
  };

  const handleEditStatus = (newStatus) => {
    console.log("Status updated to:", newStatus);
    setIsEditStatusOpen(false);
    // Logic to update the status in your state or API
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
        <h2 className="text-lg font-semibold mb-4">Edit User</h2>
        <div className="flex flex-col space-y-4 mt-4">
          <button
            type="button"
            onClick={handleRemoveUser}
            className="bg-primary text-white rounded-md px-4 py-2 hover:bg-blue-600"
          >
            Remove User
          </button>
          <button
            type="button"
            onClick={() => setIsEditUserDetailsOpen(true)}
            className="bg-primary text-white rounded-md px-4 py-2 hover:bg-blue-600"
          >
            Edit User
          </button>
          <button
            type="button"
            onClick={() => {
              console.log("Edit Status button clicked");
              setIsEditStatusOpen(true);
            }}
            className="bg-primary text-white rounded-md px-4 py-2 hover:bg-blue-600"
          >
            Edit Status
          </button>
        </div>
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          ✖
        </button>
      </div>

      {isConfirmRemoveOpen && (
        <ConfirmRemoveUserModal
          onClose={() => setIsConfirmRemoveOpen(false)}
          onConfirm={handleConfirmRemove}
        />
      )}

      {isEditUserDetailsOpen && (
        <EditUserDetailsModal
          user={user}
          onClose={() => setIsEditUserDetailsOpen(false)}
          onSave={handleEditUserDetails}
        />
      )}

      {isEditStatusOpen && (
        <EditStatusModal
          currentStatus="Active"
          onClose={() => setIsEditStatusOpen(false)}
          onSave={handleEditStatus}
        />
      )}
    </div>
  );
};

export default EditUserModal;
