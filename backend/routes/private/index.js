const message = require("./message");
const reply = require("./reply");
const express = require("express");
const router = express.Router();

router.use("/message", message);
router.use("/reply", reply);

module.exports = router;
