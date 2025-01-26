/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

Modal.setAppElement("#root");

const AddAccountTypeModal = ({ isOpen, onRequestClose }) => {
  const [accountNumber] = useState(
    Math.floor(Math.random() * 10000000000000000)
  ); // Random account number
  const [balance] = useState(10); // Default balance

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    accountType: Yup.string().required("Account type is required"),
  });

  const handleSubmit = (values) => {
    console.log("Account Type Data:", values);
    // Handle account addition logic here
    onRequestClose(); // Close the modal after submission
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          zIndex: 1000, // Ensure the overlay is on top
        },
        content: {
          zIndex: 1001, // Ensure the content is on top
          width: "500px", // Set modal width
          height: "450px", // Set modal height
          margin: "auto", // Center the modal
        },
      }}
    >
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold text-center mb-4">
          Add Account Type
        </h2>
        <div className="flex gap-2 justify-center">
          <p className="font-bold">Account Number:</p>
          <p className="mb-4">{accountNumber}</p>
        </div>
        <label className="font-bold">Select Status</label>
        <select className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4">
          <option>Active</option>
          <option>Inactive</option>
        </select>
        <p className="mb-4">
          <strong>Starting Balance:</strong> ${balance}
        </p>
        <Formik
          initialValues={{ accountType: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-6">
                <Field
                  as="select"
                  name="accountType"
                  className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                >
                  <option value="" label="Select Account Type" />
                  <option value="savings">Savings</option>
                  <option value="checking">Checking</option>
                  <option value="credit">Credit</option>
                  {/* Add more account types as needed */}
                </Field>
                <ErrorMessage
                  name="accountType"
                  component="div"
                  className="text-red-600"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={onRequestClose}
                  className="bg-red-600 text-white rounded p-2 hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue text-white rounded p-2 hover:bg-blue-700 transition"
                >
                  Add Account Type
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <button
          onClick={onRequestClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          ✖
        </button>
      </div>
    </Modal>
  );
};

export default AddAccountTypeModal;
