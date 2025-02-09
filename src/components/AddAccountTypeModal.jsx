import { useState, useEffect } from "react";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#root");

const AddAccountTypeModal = ({
  isOpen,
  onRequestClose,
  user_id,
  fetchAccounts,
}) => {
  const [accountNumber] = useState(
    Math.floor(Math.random() * 10000000000000000)
  );
  const [balance] = useState(0);
  const [accountTypes, setAccountTypes] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [userAccounts, setUserAccounts] = useState([]);

  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        fetchAccountTypes(),
        fetchStatuses(),
        // fetchUserAccounts(),
      ]);
    };

    fetchData();
  }, [user_id, token]);

  const fetchAccountTypes = async () => {
    const response = await fetch(
      `http://localhost:5000/api/accounts/user/missing-account-types/${user_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setAccountTypes(Array.isArray(data) ? data : []);
  };

  const fetchStatuses = async () => {
    const response = await fetch(
      "http://localhost:5000/api/accounts/statuses/account-statuses",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setStatuses(Array.isArray(data) ? data : []);
  };

  const validationSchema = Yup.object().shape({
    account_type_id: Yup.string().required("Account type is required"),
    status: Yup.string().required("Status is required"),
  });

  const handleSubmit = async (values) => {
    console.log("Attempting to submit with values: ", values);

    // Proceed with the submission if the check passes
    const data = {
      user_id: user_id,
      account_type_id: values.account_type_id,
      accountNumber: accountNumber,
    };

    console.log("Submitting data: ", data);

    try {
      const response = await fetch(
        "http://localhost:5000/api/accounts/accountsss/add",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      console.log("Response: ", response);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      fetchAccounts();
      // // Update the local state with the new account
      setUserAccounts([...userAccounts, { type: values.account_type_id }]);
      onRequestClose();
      toast.success(`${values.account_type_id} account added successfully!`);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add account. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={{
          overlay: { zIndex: 1000 },
          content: {
            zIndex: 1001,
            width: "500px",
            height: "450px",
            margin: "auto",
          },
        }}
      >
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-center mb-4">
            Add Account Type
          </h2>
          <Formik
            initialValues={{
              account_type_id: "",
              status: "",
              user_id: user_id,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="flex gap-2 justify-center">
                  <p className="font-bold">Account Number:</p>
                  <p className="mb-4">{accountNumber}</p>
                </div>
                <label className="font-bold">Select Status</label>
                <Field
                  as="select"
                  name="status"
                  className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                >
                  <option value="">Select Status</option>
                  {statuses.map((status) => (
                    <option key={status.id} value={status.name}>
                      {status.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="status"
                  component="div"
                  className="text-red-600"
                />
                <p className="mb-4">
                  <strong>Starting Balance:</strong> ${balance}
                </p>
                <div className="mb-6">
                  <Field
                    as="select"
                    name="account_type_id"
                    className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                  >
                    <option value="" label="Select Account Type" />
                    {accountTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.type}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="account_type_id"
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
                    className={`bg-blue text-white rounded p-2 transition ${
                      isSubmitting
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-blue-500"
                    }`}
                  >
                    {isSubmitting ? "Creating..." : "Create"}
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
    </>
  );
};

export default AddAccountTypeModal;
