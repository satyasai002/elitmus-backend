const express = require("express");
const router = express.Router();

const UserController = require("../Controllers/user");
const checkAuth = require("../Middleware/check-auth");

router.post("/signup", UserController.user_signup);
router.post("/login", UserController.user_login);
router.get("/profile", checkAuth, UserController.user_profile);

module.exports = router;
