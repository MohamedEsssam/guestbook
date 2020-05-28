const route = require("express").Router();
const auth = require("../../middleware/auth");
const { Message, validateMessageSchema } = require("../../models/message");
const MessageServices = require("../../services/MessageServices");
const MessageServicesInstance = new MessageServices(
  Message,
  validateMessageSchema
);

route.get("/:messageId", async (req, res) => {
  try {
    const message = await MessageServicesInstance.getOne(req.params.messageId);
    return res.status(200).send(message);
  } catch (err) {
    switch (err.message) {
      case "message not found":
        return res.status(404).send("message not found");

      default:
        break;
    }
  }
});

route.get("/", async (req, res) => {
  return res.status(200).send(await MessageServicesInstance.getAll());
});

route.post("/", auth, async (req, res) => {
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

route.put("/:messageId", auth, async (req, res) => {
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

route.delete("/:messageId", auth, async (req, res) => {
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
