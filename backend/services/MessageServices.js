const pick = require("lodash/pick");

class MessageServices {
  constructor(messageModel, messageSchema) {
    this.messageModel = messageModel;
    this.messageSchema = messageSchema;
  }

  async getOne(messageId) {
    const message = await this.messageModel
      .findOne({ _id: messageId })
      .populate("reply");
    if (!message) throw new Error("message not found");
    return message;
  }

  async getAll() {
    const messages = await this.messageModel.find({}).populate("reply");

    return messages;
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

    await message.updateOne(pick(date, ["message"]));

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
