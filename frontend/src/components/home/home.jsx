import React, { useEffect, useState } from "react";
import { useLocation, Link, useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { postMessage, getMessages } from "../../services/messageServices";
import { currentUser } from "../../services/userServices";

const messageSchema = Yup.object().shape({
  message: Yup.string(),
  reply: Yup.string(),
});

const messageForm = (props) => {
  return !props.user ? (
    <div>
      <div>
        <Link
          to={{
            pathname: "/login",
          }}
        >
          login
        </Link>
      </div>
      <Link
        to={{
          pathname: "/register",
        }}
      >
        register
      </Link>
    </div>
  ) : (
    props.user && (
      <div>
        <Link
          to={{
            pathname: "/",
          }}
          onClick={() => {
            localStorage.removeItem("token");
          }}
        >
          logout
        </Link>
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
          <button type="submit">Submit</button>
        </Form>
        {props.messages &&
          props.messages.map((message) => {
            return (
              <div key={message._id}>
                <Link
                  to={{
                    pathname: `/${message._id}`,
                  }}
                >
                  {message.message}
                </Link>
                <button
                  onClick={() => props.handleUpdate(message._id, props.user)}
                >
                  Edit
                </button>
              </div>
            );
          })}
        <div>{props.touched && props.touched.message === false ? "" : ""}</div>
      </div>
    )
  );
};

const Home = React.memo(() => {
  let history = useHistory();
  const location = useLocation();
  const user = location && location.user ? location.user : currentUser();

  const [isSubmit, setIsSubmit] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleUpdate = async (messageId, userId) => {
    history.push({
      pathname: `/${messageId}`,
      message: messageId,
      user: userId,
    });
  };

  useEffect(() => {
    async function getMessagesFromApi() {
      const messages = await getMessages();

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
        initialValues={{ message: "", reply: "" }}
        validationSchema={messageSchema}
        onSubmit={handleSubmit}
      >
        {(props) =>
          messageForm({
            ...props,
            isSubmit,
            setIsSubmit,
            user,
            messages,
            handleUpdate,
          })
        }
      </Formik>
    </div>
  );
});

export default Home;
