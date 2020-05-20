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

module.exports = route;
