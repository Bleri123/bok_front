import React from "react";
const ConfirmRemoveUserModal = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-100 rounded-lg shadow-lg p-6 w-96 relative">
        <h2 className="text-xl font-bold mb-4">Confirm account inactive?</h2>
        <div className="flex justify-center mt-4">
          <button
            onClick={onConfirm}
            className="bg-primary text-white rounded-md px-4 py-2 hover:bg-blue-600"
          >
            Remove User
          </button>
        </div>
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          ✖
        </button>
      </div>
    </div>
  );
};

export default ConfirmRemoveUserModal;
