const express = require("express");
const router = express.Router();

const ScoreController = require("../Controllers/score");
const checkAuth = require("../Middleware/check-auth");

router.get("/add", checkAuth, ScoreController.score_add);
router.get("/get", checkAuth, ScoreController.score_get);
module.exports = router;
