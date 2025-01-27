import { useState, useEffect } from "react";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#root");

const AddAccountTypeModal = ({ isOpen, onRequestClose, user_id }) => {
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
      const fetchAccountTypes = async () => {
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
        if (Array.isArray(data)) {
          setAccountTypes(data);
        } else {
          console.error("Fetched account types are not an array:", data);
          setAccountTypes([]);
        }
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
        if (Array.isArray(data)) {
          setStatuses(data);
        } else {
          console.error("Fetched statuses are not an array:", data);
          setStatuses([]);
        }
      };

      const fetchUserAccounts = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/accounts/user/${user_id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          if (Array.isArray(data)) {
            setUserAccounts(data);
          } else {
            console.error("Fetched user accounts are not an array:", data);
            setUserAccounts([]);
          }
        } catch (error) {
          console.error("Error fetching user accounts:", error);
          setUserAccounts([]);
        }
      };

      await fetchAccountTypes();
      await fetchStatuses();
      await fetchUserAccounts();
    };

    fetchData();
  }, [user_id, token]);

  const validationSchema = Yup.object().shape({
    accountType: Yup.string().required("Account type is required"),
    status: Yup.string().required("Status is required"),
  });

  const hasAllAccountTypes = () => {
    const accountTypeSet = new Set(
      userAccounts.map((account) => account.type.toLowerCase())
    );
    return (
      accountTypeSet.has("debit") &&
      accountTypeSet.has("credit") &&
      accountTypeSet.has("savings")
    );
  };

  const handleSubmit = async (values) => {
    if (hasAllAccountTypes()) {
      toast.error("You cannot add more accounts. Maximum limit reached.");
      return;
    }

    const token = localStorage.getItem("token");
    console.log("values", values);

    if (!token) {
      console.error("No token found");
      return;
    }

    const data = {
      user_id: values.user_id,
      account_type_id: values.accountType,
      accountNumber: accountNumber,
      // balance: balance,
      // status: values.status,
    };

    console.log("Submitting data:", data);

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
      console.log("response", data);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      onRequestClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (hasAllAccountTypes()) {
    toast.error("You cannot add more accounts. Maximum limit reached.");
    onRequestClose();
    return null;
  }

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
              accountType: "",
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
                  {statuses &&
                    statuses.map((status) => (
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
                    name="accountType"
                    className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                  >
                    <option value="" label="Select Account Type" />
                    {accountTypes &&
                      accountTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.type}
                        </option>
                      ))}
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
