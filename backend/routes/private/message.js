const route = require("express").Router();
const { Message, validateMessageSchema } = require("../../models/message");
const MessageServices = require("../../services/MessageServices");
const MessageServicesInstance = new MessageServices(
  Message,
  validateMessageSchema
);

route.post("/post", async (req, res) => {
  try {
    const message = await MessageServicesInstance.post(req.body);
    return res.status(200).send(message);
  } catch (err) {
    switch (err.message) {
      case "Enter valid data":
        return res.status(500).send("Enter valid data");

      default:
        break;
    }
  }
});

route.put("/:messageId", async (req, res) => {
  try {
    const messageId = req.params.messageId;
    const message = await MessageServicesInstance.update(
      req.body,
      messageId,
      req.body.user
    );
    return res.status(200).send(message);
  } catch (err) {
    switch (err.message) {
      case "message not found":
        return res.status(400).send("message not found");

      default:
        break;
    }
  }
});

route.delete("/:messageId", async (req, res) => {
  try {
    const messageId = req.params.messageId;
    const message = await MessageServicesInstance.delete(
      messageId,
      req.body.user
    );
    return res.status(200).send(message);
  } catch (err) {
    switch (err.message) {
      case "message not found":
        return res.status(400).send("message not found");

      default:
        break;
    }
  }
});

module.exports = route;
