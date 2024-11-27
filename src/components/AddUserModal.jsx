/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import AccountTypeModal from "./AccountTypeModal"; // Import the AccountTypeModal
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddUserModal = ({ onClose, onUserRegistrationSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    status: "",
    accountType: [], // Initialize accountType with Debit always checked
    pin: "",
    roleId: "",
    city: "",
    zipCode: "",
  });

  const [isAccountTypeModalOpen, setIsAccountTypeModalOpen] = useState(false);

  const handleAccountTypeSelect = (accountType) => {
    const updatedAccountType = formData.accountType.some(
      (account) => account.id === accountType.id
    )
      ? formData.accountType.filter((account) => account.id !== accountType.id)
      : [...formData.accountType, accountType]; // Add the entire account type object
    setFormData({ ...formData, accountType: updatedAccountType });
    setIsAccountTypeModalOpen(false); // Close the modal after selection
  };

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "First name must be at least 2 characters")
      .max(100, "First name cannot exceed 100 characters")
      .required("First name is required"),
    lastName: Yup.string()
      .min(2, "Last name must be at least 2 characters")
      .max(100, "Last name cannot exceed 100 characters")
      .required("Last name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    pin: Yup.string()
      .min(4, "Pin must be at least 4 characters")
      .max(10, "Pin cannot exceed 10 characters")
      .required("Pin is required"),
    city: Yup.string().nullable(), // Nullable
    zipCode: Yup.string().nullable(), // Nullable
    status: Yup.string().required("Status is required"),
    roleId: Yup.string().required("Role is required"),
  });

  const handleSubmit = async (values) => {
    let accountTypesArray = formData.accountType.map((account) => account.id);
    values.accountTypes = accountTypesArray;

    console.log("Form Data before submission:", values);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("User Data:", data);
      onUserRegistrationSuccess();
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const [accountStatuses, setAccountStatuses] = useState([]);
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchAccountStatuses = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/users/user-account-statuses`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setAccountStatuses(data); // Set the fetched account statuses
      } catch (error) {
        console.error("Error fetching account statuses:", error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/users/user-roles",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setRoles(data); // Set the fetched user roles
      } catch (error) {
        console.error("Error fetching user roles:", error);
      }
    };

    fetchAccountStatuses(); // Call the fetch function
    fetchRoles();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 w-11/12 sm:w-1/2">
        <h2 className="text-2xl font-semibold mb-6">Create User</h2>

        <Formik
          initialValues={formData}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <Field
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div>
                  <Field
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div>
                  <Field
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Field
                    as="select"
                    name="status"
                    className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" label="Select Status" />
                    {accountStatuses.map((status) => (
                      <option key={status.id} value={status.id}>
                        {status.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="status"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div
                  onClick={() => setIsAccountTypeModalOpen(true)} // Open the account type modal
                  className="w-full border border-gray-300 rounded p-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {
                    formData.accountType.length > 0
                      ? formData.accountType
                          .map((account) => account.type)
                          .join(", ") // Display selected account types
                      : "Select Account Type" // Placeholder when no account types are selected
                  }
                </div>
                <div>
                  <Field
                    type="text"
                    name="pin"
                    placeholder="Pin"
                    className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="pin"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div>
                  <Field
                    as="select"
                    name="roleId"
                    className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" label="Select Role" />
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}{" "}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="roleId"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div>
                  <Field
                    type="text"
                    name="city"
                    placeholder="City"
                    className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Field
                    type="text"
                    name="zipCode"
                    placeholder="Zip Code"
                    className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-400 text-white rounded p-2 hover:bg-gray-500 transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{ backgroundColor: "#3B82F6", color: "white" }} // Inline styles for visibility
                  className="rounded p-2 hover:bg-blue-700 transition"
                >
                  Create
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          ✖
        </button>

        {/* Account Type Modal */}
        {isAccountTypeModalOpen && (
          <AccountTypeModal
            onClose={() => setIsAccountTypeModalOpen(false)}
            onSelect={handleAccountTypeSelect}
            defaultChecked={formData.accountType}
          />
        )}
      </div>
    </div>
  );
};

export default AddUserModal;
