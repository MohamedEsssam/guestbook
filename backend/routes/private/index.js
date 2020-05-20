const message = require("./message");
const express = require("express");
const router = express.Router();

router.use("/message", message);

module.exports = router;
