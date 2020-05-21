import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { postMessage } from "../../services/messageServices";
const messageSchema = Yup.object().shape({
  message: Yup.string(),
  replay: Yup.string(),
});

const messageForm = (props) => {
  return (
    props.user && (
      <div>
        <Form>
          <label>
            message:
            <Field
              name="message"
              as="textarea"
              className="form-input"
              onChange={(e) => {
                props.handleChange(e);
                props.setFieldTouched("message", true);
              }}
            />
            <ErrorMessage name="message" component="div" />
          </label>
          <label>
            replay:
            <Field name="reply" as="textarea" className="form-input" />
            <ErrorMessage name="reply" component="div" />
          </label>
          <button type="submit">Submit</button>
        </Form>
        <div>
          {props.touched && props.touched.message === false ? (
            <h2>{props.values.message}</h2>
          ) : (
            ""
          )}
        </div>
      </div>
    )
  );
};

const Home = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  //let history = useHistory();
  const location = useLocation();
  let user;
  useEffect(() => {
    user =
      location.user && location.user.data
        ? location.user.data
        : JSON.parse(localStorage.getItem("user"));
    console.log(user);
  }, [isSubmit]);

  const handleSubmit = async (values, { setSubmitting, setFieldTouched }) => {
    setFieldTouched("message", false);
    values.user = user._id;
    const message = await postMessage(values);
    setIsSubmit(!isSubmit);
  };

  return (
    <div>
      <h1>Home</h1>
      <Formik
        enableReinitialize
        initialValues={{ message: "", replay: "" }}
        validationSchema={messageSchema}
        onSubmit={handleSubmit}
      >
        {(props) => messageForm({ ...props, isSubmit, setIsSubmit, user })}
      </Formik>
    </div>
  );
};

export default Home;
