const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuizSchema = new Schema(
  {
    questionDescription: {
      type: String,
      required: true
    },
    options: [],
    correctAnswer: {
      type: Number,
      required: true
    },
    marks: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = Quiz = mongoose.model("myQuiz", QuizSchema);
