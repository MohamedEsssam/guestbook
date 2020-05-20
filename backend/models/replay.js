const mongoose = require("mongoose");
const pick = require("lodash/pick");
const Joi = require("@hapi/joi");

const replaySchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

replaySchema.methods.toJSON = function () {
  const obj = this.toObject();

  return pick(obj, ["_id", "text", "user"]);
};

const Replay = mongoose.model("Replay", replaySchema);

function validateReplaySchema(replay) {
  replay.user = mongoose.Types.ObjectId(replay.user);

  const schema = Joi.object({
    text: Joi.string().required(),
    user: Joi.object().required(),
  });

  return schema.validate(replay);
}

module.exports.Replay = Replay;
exports.validateReplaySchema = validateReplaySchema;
