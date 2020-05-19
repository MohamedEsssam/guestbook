const route = require("express").Router();
const { User, validateUserSchema } = require("../../models/user");
const UserServices = require("../../services/UserServices");
const UserServicesInstance = new UserServices(User, validateUserSchema);

route.post("/login", async (req, res) => {
  try {
    const user = await UserServicesInstance.login(req.body);
    return res.status(200).send(user);
  } catch (err) {
    switch (err.message) {
      case "invalid email or password.":
        return res.status(404).send("invalid email or password.");

      default:
        break;
    }
  }
});

route.post("/register", async (req, res) => {
  try {
    const user = await UserServicesInstance.register(req.body);
    return res.status(200).send(user);
  } catch (err) {
    switch (err.message) {
      case "User already registered.":
        return res.status(403).send("User already registered.");

      case "Enter valid data":
        return res.status(500).send("Enter valid data");

      default:
        break;
    }
  }
});

module.exports = route;
