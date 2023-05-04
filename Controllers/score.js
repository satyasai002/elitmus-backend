const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Schemas/User");
const Score  = require("../Schemas/Score")
const Level = require("../Schemas/Level")

exports.score_add = async (req, res) => {
  const userId = req.userData.userId;
  const allLevels = await Level.find({ userId });
  const highestScore = await Score.findOne({userId})
  if(allLevels.length>0){
    const currScore = allLevels.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.score;
    }, 0);
    const currTime = allLevels.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.time;
    }, 0);
    if(highestScore){
        if(highestScore.score<currScore){
            highestScore.score = currScore;
            highestScore.time = currTime
            await highestScore.save();
            await Level.deleteMany({ userId });
            res.status(200).json({
              Highest: currScore,
              currScore: currScore,
              CurrentTime: currTime,
            });
        }
        else{
            await Level.deleteMany({ userId });
            res.status(200).json({
              Highest: highestScore.score,
              currScore: currScore,
              CurrentTime: currTime,
            });
        }
        
    }else{
        const newScore = new Score({
          _id: new mongoose.Types.ObjectId(),
          userId: userId,
          time: currTime,
          score:currScore,
        });
        await newScore.save();
        res.status(201).json({
          Highest: currScore,
          currScore: currScore,
          CurrentTime: currTime,
        });
    }

  }else{
        res.status(202).json({ message: "no levels found" });
  }
  
    
};

exports.score_get = async (req,res) => {
    const score = await Score.findOne({userId:req.userData.userId})
    if(score){
        res.status(201).json({ highestScore: score  });
    }else{
        res.status(202).json({ message: "no Highest score found" });
    }
    
}
