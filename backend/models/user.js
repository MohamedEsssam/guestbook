const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");
const pick = require("lodash/pick");
const Joi = require("@hapi/joi");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    required: true,
  },
});

userSchema.methods.toJSON = function () {
  const obj = this.toObject();

  return pick(obj, ["_id", "name", "email"]);
};

userSchema.methods.generateAuthToken = function () {
  const user = this.toObject();

  const payload = {
    ...pick(user, ["_id", "name"]),
  };
  const token = jwt.sign(payload, config.get("authSecret"));
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUserSchema(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  return schema.validate(user);
}

module.exports.User = User;
exports.validateUserSchema = validateUserSchema;
