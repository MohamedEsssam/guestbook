import React, { useEffect, useState } from "react";
import { useLocation, useHistory, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  getMessage,
  updateMessage,
  deleteMessage,
  addReply,
} from "../../services/messageServices";
const messageSchema = Yup.object().shape({
  message: Yup.string(),
  reply: Yup.string(),
});

const messageForm = (props) => {
  console.log(props.user._id, props.message.user);

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
          {props.user._id === props.message.user ? (
            <div>
              <button type="submit">Update</button>
              <button type="submit" onClick={props.handleDelete}>
                Delete
              </button>
            </div>
          ) : (
            ""
          )}
        </Form>
        {props.message.reply &&
          props.message.reply.map((rep) => {
            return <h2 key={rep._id}>{rep.text}</h2>;
          })}
        <label>
          reply:
          <textarea
            defaultValue=""
            name="reply"
            as="textarea"
            className="form-input"
            onChange={props.handleChange}
          />
          <ErrorMessage name="reply" component="div" />
        </label>
        <button type="submit" onClick={props.addNewReply}>
          Add Reply
        </button>
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
  const [reply, setReply] = useState("");

  useEffect(() => {
    async function getMessageFromApi(messageId) {
      const message = await getMessage(messageId);
      setMessage(message.data);
    }

    getMessageFromApi(messageId);
  }, [isSubmit]);

  const handleSubmit = async (
    values,
    { setSubmitting, setFieldTouched, setFieldValue }
  ) => {
    values.user = user._id;
    const message = await updateMessage(values, messageId);

    if (message) history.push("/");
  };

  const handleChange = (event) => {
    console.log(event.target.value);

    setReply(event.target.value);
  };

  const addNewReply = async () => {
    const message = await addReply({
      user: user._id,
      messageId: messageId,
      text: reply,
    });
    setMessage(message);
    setIsSubmit(!isSubmit);
    console.log(message);
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
        initialValues={{ message: message.message, reply: "" }}
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
            handleDelete,
            addNewReply,
            handleChange,
          })
        }
      </Formik>
    </div>
  );
});

export default Message;
