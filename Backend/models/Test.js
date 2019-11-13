const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestSchema = new Schema(
  {
    questions: [
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
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = Test = mongoose.model("myTest", TestSchema);
