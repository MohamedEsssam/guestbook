const route = require("express").Router();
const { Message } = require("../../models/message");
const { Reply, validateReplySchema } = require("../../models/reply");

const ReplyServices = require("../../services/replyServices");
const ReplyServicesInstance = new ReplyServices(Message, Reply);

route.post("/", async (req, res) => {
  try {
    const message = await ReplyServicesInstance.add(req.body);
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

route.delete("/:replyId", async (req, res) => {
  try {
    console.log(req.body);

    const replyId = req.params.replyId;
    const message = await ReplyServicesInstance.delete(
      replyId,
      req.body.user,
      req.body.messageId
    );
    return res.status(200).send(message);
  } catch (err) {
    switch (err.message) {
      case "message not found":
        return res.status(400).send("message not found");
      case "reply not found":
        return res.status(400).send("reply not found");

      default:
        break;
    }
  }
});

module.exports = route;
