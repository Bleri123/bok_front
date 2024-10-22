import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  pin: Yup.string().max(32).required('Pin is required')
});

export const LoginPage = () => (
  <div>
    <h1>Signup</h1>
    <Formik
      initialValues={{
        email: '',
        pin: ''
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        // same shape as initial values
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col gap-2 w-52">
          <Field name="email"  type="email" className="border-2 " />
          {errors.email && touched.email ? (
            <div className="text-red-400">{errors.email}</div>
          ) : null}
          <Field name="pin" type="password" className="border-2 " />
          {errors.pin && touched.pin ? (
            <div className="text-red-400">{errors.pin}</div>
          ) : null}
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
);

export default LoginPage;
