import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { postMessage, getMessages } from "../../services/messageServices";
const messageSchema = Yup.object().shape({
  message: Yup.string(),
  replay: Yup.string(),
});

const messageForm = (props) => {
  console.log(props.messages);

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
        {props.messages &&
          props.messages.map((message) => {
            return <h2 key={message._id}>{message.message}</h2>;
          })}
        <div>{props.touched && props.touched.message === false ? "" : ""}</div>
      </div>
    )
  );
};

const Home = React.memo(() => {
  const location = useLocation();
  const user =
    location.user && location.user.data
      ? location.user.data
      : JSON.parse(localStorage.getItem("user"));
  console.log(user);

  const [isSubmit, setIsSubmit] = useState(false);
  const [messages, setMessages] = useState([]);

  //let history = useHistory();
  useEffect(() => {
    async function getMessagesFromApi() {
      const messages = await getMessages();
      console.log(messages.data);

      setMessages(messages.data);
    }

    getMessagesFromApi();
  }, [isSubmit]);

  const handleSubmit = async (values, { setSubmitting, setFieldTouched }) => {
    setFieldTouched("message", false);
    values.user = user._id;
    await postMessage(values);
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
        {(props) =>
          messageForm({ ...props, isSubmit, setIsSubmit, user, messages })
        }
      </Formik>
    </div>
  );
});

export default Home;
