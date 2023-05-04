const express = require("express");
const router = express.Router();

const LevelController = require("../Controllers/level");
const checkAuth = require("../Middleware/check-auth");

router.post("/add", checkAuth, LevelController.level_add);
router.get("/get", checkAuth, LevelController.level_getLevel);


module.exports = router;
