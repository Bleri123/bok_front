import React, { useState } from "react";
import ConfirmRemoveUserModal from "./ConfirmRemoveUserModal";
import EditUserDetailsModal from "./EditUserDetailsModal";
import EditStatusModal from "./EditStatusModal";
import axios from "axios";
import getToken from "../utils/getToken";
import toast from "react-hot-toast";

const EditUserModal = ({
  user,
  onClose,
  onSave,
  userAccountStatus,
  fetchAllUsers,
}) => {
  const [isConfirmRemoveOpen, setIsConfirmRemoveOpen] = useState(false);
  const [isEditUserDetailsOpen, setIsEditUserDetailsOpen] = useState(false);
  const [isEditStatusOpen, setIsEditStatusOpen] = useState(false);
  const token = getToken();

  const handleRemoveUser = () => {
    setIsConfirmRemoveOpen(true);
  };
  const handleConfirmRemove = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/users/set/user/inactive/${user?.id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      onClose();
      await fetchAllUsers();

      toast.success("User successfully updated", {
        duration: 4000,
        position: "top-right",
      });
    } catch (error) {
      console.error("Error removing user:", error);
    }
  };

  const handleEditUserDetails = async (updatedUser) => {
    console.log("User details updated:", updatedUser);

    onSave(updatedUser);

    setIsEditUserDetailsOpen(false);
    await fetchAllUsers();
    onClose();
  };

  const handleEditStatus = async (newStatus) => {
    try {
      const data = { user_account_status_id: newStatus };

      await axios.put(
        `http://localhost:5000/api/users/set/user/account/status/${user?.id}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      await fetchAllUsers();
      toast.success("User successfully updated", {
        duration: 4000,
        position: "top-right",
      });
      setIsEditStatusOpen(false);
      onClose();
    } catch (error) {
      console.error("Error updating user status:", error);
      toast.error("Failed to update user status", {
        duration: 4000,
        position: "top-right",
      });
    }
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
          user={user}
          onClose={() => setIsEditStatusOpen(false)}
          onSave={handleEditStatus}
          userAccountStatus={userAccountStatus}
        />
      )}
    </div>
  );
};

export default EditUserModal;
