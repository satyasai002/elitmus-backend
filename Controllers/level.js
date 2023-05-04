const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Schemas/User");
const Level = require("../Schemas/Level")

exports.level_add =async (req, res) => {
  const { levelName, time,stage,score } = req.body;
  const userId = req.userData.userId;
  const existingLevel = await Level.findOne({ userId, levelName });

  if (existingLevel) {
    existingLevel.time += time;
    existingLevel.score = score;
    await existingLevel.save();
    res.status(200).json({ message: 'Level data updated' });
  } else {
    const newLevel = new Level({_id:new mongoose.Types.ObjectId(), userId:userId, levelName:levelName, time:time,stage:stage,score:score });
    await newLevel.save();
    res.status(201).json({ message: 'Level data created' });
  }
};
exports.level_getLevel= async (req,res) =>{
    const userId = req.userData.userId;
    const userLevels = await Level.find({ userId});

  if (userLevels.length === 0) {
    res.status(404).json({ message: 'No level data found for user and stage' });
  } else {
    userLevels.sort((a, b) => a.stage - b.stage);
    let highestLevel = userLevels[userLevels.length-1];
    res.status(200).json({ highestLevel });
  }
}
