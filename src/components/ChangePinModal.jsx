import React, { useEffect, useState } from "react";
import axios from "axios";
import EyeIcon from "./EyeIcon";
import toast from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const EditStatusModal = ({ user, onClose, onSave }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    pin: Yup.string()
      .min(4, "Pin must be at least 4 characters")
      .max(10, "Pin cannot exceed 10 characters")
      .required("Pin is required"),
    confirmPin: Yup.string()
      .oneOf([Yup.ref("pin"), null], "Pins must match")
      .required("Confirm Pin is required"),
  });

  const changePin = async (values) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/auth/change-user-pin`,
        {
          user_id: user.id,
          pin: values.pin,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("response: ", response);
      const data = response.data;
      console.log("Update successful:", data);
      toast.success("User PIN successfully updated", {
        duration: 4000,
        position: "top-right",
      });

      onSave(data, { pin: values.pin });
      onClose();
    } catch (error) {
      console.error("Error updating user PIN:", error);
      toast.error("Error updating user PIN", {
        duration: 4000,
        position: "top-right",
      });
      onClose();
    }
  };

  return (
    <Formik
      initialValues={{ pin: "", confirmPin: "" }}
      validationSchema={validationSchema}
      onSubmit={changePin}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-gray-100 rounded-lg shadow-lg p-6 w-96 relative">
              <h2 className="text-lg font-semibold mb-4">CHANGE PIN</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  New Pin
                </label>
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="pin"
                    className="border border-gray-300 rounded-md p-2 w-full"
                    placeholder="PIN"
                    autoComplete="PIN"
                  />
                  <EyeIcon
                    isOpen={showPassword}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                  <ErrorMessage
                    name="pin"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Pin
                </label>
                <div className="relative">
                  <Field
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPin"
                    className="border border-gray-300 rounded-md p-2 w-full"
                    placeholder="CONFIRM PIN"
                    autoComplete="CONFIRM PIN"
                  />
                  <EyeIcon
                    isOpen={showConfirmPassword}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                  <ErrorMessage
                    name="confirmPin"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary text-white rounded-md px-4 py-2 hover:bg-blue-600 w-full"
              >
                Save
              </button>
              <button
                type="button"
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                onClick={onClose}
              >
                ✖
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditStatusModal;
