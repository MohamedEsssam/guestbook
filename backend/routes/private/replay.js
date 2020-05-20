const route = require("express").Router();
const { Message } = require("../../models/message");
const { Replay, validateReplaySchema } = require("../../models/replay");

const ReplayServices = require("../../services/replayServices");
const ReplayServicesInstance = new ReplayServices(Message, Replay);

route.post("/", async (req, res) => {
  try {
    console.log(req.body);

    const message = await ReplayServicesInstance.add(req.body);
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

route.delete("/:replayId", async (req, res) => {
  try {
    console.log(req.body);

    const replayId = req.params.replayId;
    const message = await ReplayServicesInstance.delete(
      replayId,
      req.body.user,
      req.body.messageId
    );
    return res.status(200).send(message);
  } catch (err) {
    switch (err.message) {
      case "message not found":
        return res.status(400).send("message not found");
      case "replay not found":
        return res.status(400).send("replay not found");

      default:
        break;
    }
  }
});

module.exports = route;
