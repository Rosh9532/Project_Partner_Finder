const express = require("express");
const { Signup, login, profile } = require("../controllers/user");
const { requireSignin } = require("../middleware/mid");
const router = express.Router();
//url,callback
router.post("/signup", Signup);
router.post("/login", login);
router.get("/profile", requireSignin, profile);
module.exports = router;
