const pick = require("lodash/pick");
const bcrypt = require("bcrypt");

class UserServices {
  constructor(userModel, userSchema) {
    this.userModel = userModel;
    this.userSchema = userSchema;
  }

  /**
   *
   * @param {*} data
   */
  async login(data) {
    let user = await this.userModel.findOne({ email: data.email });
    if (!user) throw new Error("invalid email or password.");

    if (!(await bcrypt.compare(data.password, user.password)))
      throw new Error("invalid email or password.");

    const token = user.generateAuthToken();

    return [user, token];
  }

  /**
   *
   * @param {*} data
   */
  async register(data) {
    const { error } = this.userSchema(
      pick(data, ["name", "email", "password"])
    );
    if (error) throw new Error("Enter valid data");

    let user = await this.userModel.findOne({ email: data.email });
    if (user) throw new Error("User already registered.");

    user = await new this.userModel(pick(data, ["name", "email", "password"]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();

    return token;
  }
}

module.exports = UserServices;
