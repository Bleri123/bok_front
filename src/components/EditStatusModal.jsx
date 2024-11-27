import React, { useState } from 'react';

const EditStatusModal = ({ currentStatus, onClose, onSave }) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const statuses = ["Active", "Passive", "Suspended", "Banned"];

  const handleSave = () => {
    console.log("Saving status:", selectedStatus);
    onSave(selectedStatus);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-100 rounded-lg shadow-lg p-6 w-96 relative">
        <h2 className="text-lg font-semibold mb-4">Edit Status</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Current Status
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleSave}
          className="bg-primary text-white rounded-md px-4 py-2 hover:bg-blue-600 w-full"
        >
          Save
        </button>
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

export default EditStatusModal;
