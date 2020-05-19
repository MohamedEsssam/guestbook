import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const registerSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Enter valid email").required("Email is required"),
  password: Yup.string()
    .min(5, "should be 5 characters minimum")
    .max(16)
    .matches(
      "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])",
      "password must contain capital letter and numbers"
    )
    .required("password is require"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords do not match")
    .required("Password confirmation required"),
});

const registerFrom = () => {
  return (
    <Form>
      <label>
        Name: <Field type="name" name="name" />
        <ErrorMessage name="name" component="div" />
      </label>

      <label>
        Email: <Field type="email" name="email" />
        <ErrorMessage name="email" component="div" />
      </label>
      <label>
        Password:
        <Field type="password" name="password" />
        <ErrorMessage name="password" component="div" />
      </label>
      <label>
        Confirm Password:
        <Field type="password" name="confirmPassword" />
        <ErrorMessage name="confirmPassword" component="div" />
      </label>

      <button type="submit">Submit</button>
    </Form>
  );
};

const Register = () => {
  const handleSubmit = (values, { setSubmitting }) => {
    //TODO call axios
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  return (
    <>
      <h1>Register</h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {registerFrom}
      </Formik>
    </>
  );
};

export default Register;
