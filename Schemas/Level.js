const mongoose = require("mongoose");

const levelSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    levelName: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    score:{
        type:Number,
        required:true,
    },
    time: {
      type: Number,
      required: true,
    },
    stage:{
        type:Number,
        required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Level", levelSchema);
