import BOKLogo from '../assets/BOKLOGO.png';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  pin: Yup.string().max(32).required('Pin is required'),
});

//Bonja ignore proptypes se i spjegojna djal
function CustomField({ name, type, placeholder, isValid }) {
  console.log({isValid})
  return (
    <Field
      name={name}
      type={type}
      className={`w-full p-2 border-b-2 border-gray-400 ${
        isValid ? 'border-gray-400' : 'border-red-400'
      }`}
      placeholder={placeholder}
    />
  );
}

function CustomError({ children }) {
  return <div className="text-red-600">{children}</div>;
}

export const LoginPage = () => (
  <div className="bg-slate-800 font-poppins min-h-[100vh] flex flex-col items-center ">
    <div className="flex flex-col items-center max-w-[700px] w-full md:w-[80%]">
      <img src={BOKLogo} alt="bank of kosovo logo" className="w-56 h-auto" />
      <div className="bg-gray-300 sm:w-[60%] w-full rounded-sm">
        <h1 className="text-center p-5 text-5xl text-slate-700 mb-2 border-b-2 border-slate-800">
          Login
        </h1>
        <Formik
          initialValues={{
            email: '',
            pin: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            // same shape as initial values
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col items-center gap-2 ml-10 mr-10 ps-2 pb-5 pt-5">
              <CustomField
                name="email"
                type="text"
                placeholder="Email"
                isValid={errors?.email === null}
              />

              {errors.email && touched.email ? (
                <CustomError>{errors.email}</CustomError>
              ) : null}

              <CustomField
                name="pin"
                type="password"
                placeholder="Password"
                isValid={errors?.email === null}
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
              <div className="text-sm text-pretty text-center">
                <p>Sign Up Information:</p> At the moment, signing up for an
                account cannot be completed online. To create a new account,
                please visit us in person at our physical location. We apologize
                for any inconvenience and appreciate your understanding.
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  </div>
);

export default LoginPage;
