const express = require("express");
const router = express.Router();

router.use("/login", require("./login"));
router.use("/register", require("./register"));
router.use("/post", require("./post"));

module.exports = router;
