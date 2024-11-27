/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

const AccountTypeModal = ({ onClose, onSelect }) => {
  const [accountTypes, setAccountTypes] = useState([]);

  useEffect(() => {
    const fetchAccountTypes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:5000/api/accounts/types/account`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setAccountTypes(data); // Set the fetched account types
      } catch (error) {
        console.error("Error fetching account types:", error);
      }
    };

    fetchAccountTypes(); // Call the fetch function
  }, []);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 w-11/12 sm:w-1/3">
        <h2 className="text-xl font-semibold mb-4">Select Account Type</h2>
        <div className="flex flex-col space-y-4">
          {accountTypes.map((type) => (
            <button
              key={type.id} // Use the unique id for the key
              onClick={() => onSelect(type)} // Use the type field for selection
              className="bg-gray-800 text-white rounded p-3 hover:bg-gray-700 transition"
            >
              {type.type} {/* Display the account type */}
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          ✖
        </button>
      </div>
    </div>
  );
};

export default AccountTypeModal;
