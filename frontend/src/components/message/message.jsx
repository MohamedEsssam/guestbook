import React, { useEffect, useState } from "react";
import { useLocation, useHistory, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  getMessage,
  updateMessage,
  deleteMessage,
} from "../../services/messageServices";
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
              defaultValue={props.message.message}
              name="message"
              as="textarea"
              className="form-input"
            />
            <ErrorMessage name="message" component="div" />
          </label>
          <button type="submit">Update</button>
          <button type="submit" onClick={props.handleDelete}>
            Delete
          </button>
        </Form>
      </div>
    )
  );
};

const Message = React.memo(() => {
  let history = useHistory();
  let prams = useParams();
  const location = useLocation();
  const user =
    location.user && location.user.data
      ? location.user.data
      : JSON.parse(localStorage.getItem("user"));

  const [isSubmit, setIsSubmit] = useState(false);
  const messageId = location.message ? location.message : prams.id;

  const [message, setMessage] = useState([]);

  useEffect(() => {
    async function getMessageFromApi(messageId) {
      const message = await getMessage(messageId);
      setMessage(message.data);
    }

    getMessageFromApi(messageId);
  }, []);

  const handleSubmit = async (
    values,
    { setSubmitting, setFieldTouched, setFieldValue }
  ) => {
    values.user = user._id;
    const message = await updateMessage(values, messageId);

    if (message) history.push("/");
  };
  const handleDelete = async () => {
    const deletedMessage = await deleteMessage({ user: user._id }, messageId);

    if (deletedMessage) history.push("/");
  };
  return (
    <div>
      <h1>message</h1>
      <Formik
        enableReinitialize
        initialValues={{ message: "", replay: "" }}
        validationSchema={messageSchema}
        onSubmit={handleSubmit}
      >
        {(props) =>
          messageForm({
            ...props,
            isSubmit,
            setIsSubmit,
            user,
            message,
            handleUpdate,
            handleDelete,
          })
        }
      </Formik>
    </div>
  );
});

export default Message;
