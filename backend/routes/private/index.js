const message = require("./message");
const replay = require("./replay");
const express = require("express");
const router = express.Router();

router.use("/message", message);
router.use("/replay", replay);

module.exports = router;
