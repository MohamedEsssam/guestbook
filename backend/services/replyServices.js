const pick = require("lodash/pick");

class ReplyServices {
  constructor(messageModel, replyModel) {
    this.messageModel = messageModel;
    this.replyModel = replyModel;
  }

  /**
   *
   * @param {*} data
   */
  async add(data) {
    const message = await this.messageModel.findOne({
      _id: data.messageId,
    });
    if (!message) throw new Error("message not found");

    const reply = await new this.replyModel(pick(data, ["text", "user"]));
    await reply.save();

    await message.reply.push(reply._id);
    await message.save();

    return message.populate("reply");
  }

  async delete(replyId, userId, messageId) {
    const message = await this.messageModel.findOne({
      _id: messageId,
      user: userId,
    });
    if (!message) throw new Error("message not found");

    const reply = await this.replyModel.findOne({
      _id: replyId,
      user: userId,
    });
    if (!reply) throw new Error("reply not found");

    await message.reply.remove(replyId);
    await message.save();

    await reply.deleteOne({
      _id: replyId,
      user: userId,
    });

    return message.populate("reply");
  }
}

module.exports = ReplyServices;
