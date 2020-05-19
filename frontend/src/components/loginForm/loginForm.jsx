import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Enter valid email").required("Email is required"),
  password: Yup.string()
    .min(5, "should be 5 characters minimum")
    .max(16)
    .matches(
      "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])",
      "password must contain letter and capital letter and numbers"
    )
    .required("password is require"),
});

const loginForm = () => {
  return (
    <Form>
      <label>
        Email: <Field type="email" name="email" />
        <ErrorMessage name="email" component="div" />
      </label>
      <label>
        Password:
        <Field type="password" name="password" />
        <ErrorMessage name="password" component="div" />
      </label>
      <button type="submit">Submit</button>
    </Form>
  );
};

const Login = () => {
  const handleSubmit = (values, { setSubmitting }) => {
    //TODO call axios
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  return (
    <>
      <h1>Login</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {loginForm}
      </Formik>
    </>
  );
};

export default Login;
