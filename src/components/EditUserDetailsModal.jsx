import React, { useState } from 'react';

const EditUserDetailsModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-100 rounded-lg shadow-lg p-6 w-120 relative">
        <h2 className="text-lg font-semibold mb-4">Edit Users</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Surname
            </label>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Surname"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Account Type
            </label>
            <input
              type="text"
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Account Type"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              PIN
            </label>
            <input
              type="text"
              name="pin"
              value={formData.pin}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="PIN"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Phone Number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Account Status
            </label>
            <input
              type="text"
              name="accountStatus"
              value={formData.accountStatus}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Account Status"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Account Type/s
            </label>
            <input
              type="text"
              name="accountTypes"
              value={formData.accountTypes}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Account Type/s"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="City"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Zip Code
            </label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Zip Code"
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white rounded-md px-4 py-2 hover:bg-blue-600 col-span-2"
          >
            Edit
          </button>
        </form>
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

export default EditUserDetailsModal;
