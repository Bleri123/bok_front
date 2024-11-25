import React from 'react';

const AccountTypeModal = ({ onClose, onSelect }) => {
  const accountTypes = ['Debit', 'Credit', 'Savings'];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 w-11/12 sm:w-1/3">
        <h2 className="text-xl font-semibold mb-4">Select Account Type</h2>
        <div className="flex flex-col space-y-4">
          {accountTypes.map((type) => (
            <button
              key={type}
              onClick={() => onSelect(type)}
              className="bg-gray-800 text-white rounded p-3 hover:bg-gray-700 transition"
            >
              {type}
            </button>
          ))}
        </div>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
          ✖
        </button>
      </div>
    </div>
  );
};

export default AccountTypeModal;
