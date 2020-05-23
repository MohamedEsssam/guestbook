const mongoose = require("mongoose");
const pick = require("lodash/pick");
const Joi = require("@hapi/joi");

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reply: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }],
  },
});

messageSchema.methods.toJSON = function () {
  const obj = this.toObject();

  return pick(obj, ["_id", "message", "user", "reply"]);
};

const Message = mongoose.model("Message", messageSchema);

function validateMessageSchema(message) {
  message.user = mongoose.Types.ObjectId(message.user);

  const schema = Joi.object({
    message: Joi.string().required(),
    user: Joi.object().required(),
  });

  return schema.validate(message);
}

module.exports.Message = Message;
exports.validateMessageSchema = validateMessageSchema;
