const mongoose = require("mongoose");
const pick = require("lodash/pick");
const Joi = require("@hapi/joi");

const replySchema = new mongoose.Schema({
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

replySchema.methods.toJSON = function () {
  const obj = this.toObject();

  return pick(obj, ["_id", "text", "user"]);
};

const Reply = mongoose.model("Reply", replySchema);

function validateReplySchema(reply) {
  reply.user = mongoose.Types.ObjectId(reply.user);

  const schema = Joi.object({
    text: Joi.string().required(),
    user: Joi.object().required(),
  });

  return schema.validate(reply);
}

module.exports.Reply = Reply;
exports.validateReplySchema = validateReplySchema;
