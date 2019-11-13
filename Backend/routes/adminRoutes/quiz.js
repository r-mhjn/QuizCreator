const express = require("express");
const router = express.Router();

// Importing schemas
const Quiz = require("../../models/Quiz");

// @type     GET
// @route    /admin/quiz/
// @desc     route to get a quiz questions
// @access   Private

router.get("/", (req, res) => {
  Quiz.find()
    .then(quiz => {
      res.json(quiz);
    })
    .catch(err =>
      console.log("Error while finding quiz schema for get " + err)
    );
});

// @type     POST
// @route    /admin/quiz/
// @desc     route to add a quiz question
// @access   Private

router.post("/", (req, res) => {
  Quiz.find()
    .then(quiz => {
      let newQuestion = new Quiz({
        questionDescription: req.body.questionDescription,
        options: req.body.options,
        correctAnswer: req.body.correctAnswer,
        marks: req.body.marks
      });

      newQuestion
        .save()
        .then(response => {
          res.json({ success: "question saved success" });
        })
        .catch(err =>
          console.log("Error saving quiz question to database" + err)
        );
    })
    .catch(err =>
      console.log("Error finding quiz schema to post a question " + err)
    );
});

module.exports = router;
