const pick = require("lodash/pick");

class ReplayServices {
  constructor(messageModel, replayModel) {
    this.messageModel = messageModel;
    this.replayModel = replayModel;
  }

  /**
   *
   * @param {*} data
   */
  async add(data) {
    const message = await this.messageModel.findOne({
      _id: data.messageId,
      user: data.user,
    });
    if (!message) throw new Error("message not found");

    const reply = await new this.replayModel(pick(data, ["text", "user"]));
    await reply.save();

    await message.replay.push(reply._id);
    await message.save();

    return message.populate("replay");
  }

  async delete(replayId, userId, messageId) {
    const message = await this.messageModel.findOne({
      _id: messageId,
      user: userId,
    });
    if (!message) throw new Error("message not found");

    const replay = await this.replayModel.findOne({
      _id: replayId,
      user: userId,
    });
    if (!replay) throw new Error("replay not found");

    await message.replay.remove(replayId);
    await message.save();

    await replay.deleteOne({
      _id: replayId,
      user: userId,
    });

    return message.populate("replay");
  }
}

module.exports = ReplayServices;
