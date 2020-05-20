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
  async update(date, messageId, userId) {
    const message = await this.messageModel.findOne({
      _id: messageId,
      user: userId,
    });
    if (!message) throw new Error("message not found");

    await message.update(pick(date, ["message"]));

    return message;
  }

  async delete(messageId, userId) {
    const message = await this.messageModel.findOne({
      _id: messageId,
      user: userId,
    });
    if (!message) throw new Error("message not found");

    await message.deleteOne({
      _id: messageId,
      user: userId,
    });

    return message;
  }
}

module.exports = MessageServices;
