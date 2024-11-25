import React, { useState } from 'react';
import AccountTypeModal from './AccountTypeModal'; // Import the AccountTypeModal

const AddUserModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    status: '',
    accountType: '',
    pin: '',
    roleId: '',
    city: '',
    zipCode: '',
  });

  const [isAccountTypeModalOpen, setIsAccountTypeModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAccountTypeSelect = (type) => {
    setFormData({ ...formData, accountType: type });
    setIsAccountTypeModalOpen(false); // Close the modal after selection
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User Data:', formData);
    onClose(); // Close the modal after submission
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 w-11/12 sm:w-1/2">
        <h2 className="text-2xl font-semibold mb-6">Create Users</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="status"
              placeholder="Status"
              value={formData.status}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div
              onClick={() => setIsAccountTypeModalOpen(true)} // Open the account type modal
              className="border border-gray-300 rounded p-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {formData.accountType || 'Account type/s'} {/* Display selected account type */}
            </div>
            <input
              type="text"
              name="pin"
              placeholder="Pin"
              value={formData.pin}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="roleId"
              placeholder="Role_ID"
              value={formData.roleId}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="zipCode"
              placeholder="Zip Code"
              value={formData.zipCode}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-between">
            <button type="button" onClick={onClose} className="bg-gray-400 text-white rounded p-2 hover:bg-gray-500 transition">
              Back
            </button>
            <button
              type="submit"
              style={{ backgroundColor: '#3B82F6', color: 'white' }} // Inline styles for visibility
              className="rounded p-2 hover:bg-blue-700 transition"
            >
              Create
            </button>
          </div>
        </form>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
          ✖
        </button>

        {/* Account Type Modal */}
        {isAccountTypeModalOpen && (
          <AccountTypeModal
            onClose={() => setIsAccountTypeModalOpen(false)}
            onSelect={handleAccountTypeSelect}
          />
        )}
      </div>
    </div>
  );
};

export default AddUserModal;
