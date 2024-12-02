import React, { useState } from "react";
import ConfirmRemoveUserModal from "./ConfirmRemoveUserModal";
import EditUserDetailsModal from "./EditUserDetailsModal";
import EditStatusModal from "./EditStatusModal";
import ChangePinModal from "./ChangePinModal";
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
  const [isChangePinOpen, setIsChangePinOpen] = useState(false);
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

  const handleUserPinChanged = () => {
    console.log("Pin changed successfully for selected user!");
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
          <button
            type="button"
            onClick={() => {
              setIsChangePinOpen(true);
            }}
            className="bg-primary text-white rounded-md px-4 py-2 hover:bg-blue-600 flex justify-center gap-3"
          >
            Change Pin
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M9 16C9 16.5523 8.55228 17 8 17C7.44772 17 7 16.5523 7 16C7 15.4477 7.44772 15 8 15C8.55228 15 9 15.4477 9 16Z"
                  fill="#feb416"
                ></path>{" "}
                <path
                  d="M13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16Z"
                  fill="#feb416"
                ></path>{" "}
                <path
                  d="M17 16C17 16.5523 16.5523 17 16 17C15.4477 17 15 16.5523 15 16C15 15.4477 15.4477 15 16 15C16.5523 15 17 15.4477 17 16Z"
                  fill="#feb416"
                ></path>{" "}
                <path
                  d="M6 10V8C6 7.65929 6.0284 7.32521 6.08296 7M18 10V8C18 4.68629 15.3137 2 12 2C10.208 2 8.59942 2.78563 7.5 4.03126"
                  stroke="#feb416"
                  stroke-width="1.5"
                  stroke-linecap="round"
                ></path>{" "}
                <path
                  d="M11 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.75736 10 5.17157 10 8 10H16C18.8284 10 20.2426 10 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15"
                  stroke="#feb416"
                  stroke-width="1.5"
                  stroke-linecap="round"
                ></path>{" "}
              </g>
            </svg>
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

      {isChangePinOpen && (
        <ChangePinModal
          user={user}
          onClose={() => setIsChangePinOpen(false)}
          onSave={handleUserPinChanged}
        />
      )}
    </div>
  );
};

export default EditUserModal;
