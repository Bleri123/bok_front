import PropTypes from "prop-types";
import newBOKlogo from "../assets/newBOKlogo2.png";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import storeToken from "../utils/storeToken";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  pin: Yup.string().max(32).required("Pin is required"),
});

function CustomField({ name, type, placeholder, isValid }) {
  return (
    <Field
      name={name}
      type={type}
      className={`w-full p-2 border-b-2 border-gray-400 ${
        isValid ? "border-gray-400" : "border-red-400"
      }`}
      placeholder={placeholder}
    />
  );
}

function CustomError({ children }) {
  return <div className="text-red-600">{children}</div>;
}

export function LoginPage() {
  const savedToken = localStorage.getItem("token");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //If you have saved a token then navigate to dashboard
  if (savedToken) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="bg-slate-800 font-poppins min-h-[100vh] flex flex-col items-center ">
      <div className="flex flex-col items-center max-w-[700px] w-full md:w-[80%]">
        <Link to="/">
          <img
            src={newBOKlogo}
            alt="bank of kosovo logo"
            className="w-56 h-auto"
          />
        </Link>
        <div className="bg-gray-300 sm:w-[60%] w-full rounded-sm">
          <h1 className="text-center p-5 text-5xl text-slate-700 mb-2 border-b-2 border-slate-800">
            Login
          </h1>
          <Formik
            initialValues={{
              email: "",
              pin: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={async (values) => {
              try {
                const res = await axios.post(
                  "http://localhost:5000/auth/login",
                  values
                );
                setError(null);
                storeToken(res.data.token);
                navigate("/dashboard", {
                  replace: true,
                });
              } catch (e) {
                if (e.response) {
                  setError(e.response.data.error);
                } else {
                  setError(e.message);
                }
              }
            }}
          >
            {({ errors, touched }) => (
              <Form className="flex flex-col items-center gap-2 ml-10 mr-10 ps-2 pb-5 pt-5">
                <CustomField
                  name="email"
                  type="text"
                  placeholder="Email"
                  isValid={!errors.email}
                />

                {errors.email && touched.email ? (
                  <CustomError>{errors.email}</CustomError>
                ) : null}

                <CustomField
                  name="pin"
                  type="password"
                  placeholder="Password"
                  isValid={!errors.pin}
                />

                {errors.pin && touched.pin && (
                  <CustomError>{errors.pin}</CustomError>
                )}

                <button
                  type="submit"
                  className="border-2 w-full rounded-full hover:bg-gray-800 transition-colors ease-in-out delay-50 hover:text-white duration-100  border-gray-800 mt-5 p-2"
                >
                  Submit
                </button>
                {error && <CustomError>{error}</CustomError>}
                <div className="text-sm text-pretty text-center">
                  <p>Sign Up Information:</p> At the moment, signing up for an
                  account cannot be completed online. To create a new account,
                  please visit us in person at our physical location. We
                  apologize for any inconvenience and appreciate your
                  understanding.
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

CustomError.propTypes = {
  children: PropTypes.any,
};

CustomField.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  isValid: PropTypes.bool,
};

export default LoginPage;
