const pick = require("lodash/pick");
const bcrypt = require("bcrypt");

class MessageServices {
  constructor(messageModel, messageSchema) {
    this.messageModel = messageModel;
    this.messageSchema = messageSchema;
  }

  /**
   *
   * @param {*} data
   */
  async post(data) {
    const { error } = this.messageSchema(pick(data, ["message", "user"]));
    if (error) throw new Error("Enter valid data");

    let message = await new this.messageModel(pick(data, ["message", "user"]));
    await message.save();

    return message;
  }

  /**
   *
   * @param {*} data
   */
  async update(messageId) {}

  async delete(messageId) {}
}

module.exports = MessageServices;
