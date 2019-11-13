const express = require("express");
const router = express.Router();

// Importing schemas
const Test = require("../../models/Test");

router.get("/", (req, res) => {
  res.json({ success: "working" });
});

// @type     GET
// @route    /admin//
// @desc     route to get a quiz questions
// @access   Private

// @type     POST
// @route    /admin/test/
// @desc     route to add a test
// @access   Private

router.post("/", (req, res) => {
  Test.find()
    .then(test => {
      let newTest = new Test({
        questions: req.body.questions
      });
      newTest
        .save()
        .then(result => {
          res.json({ success: "test saved" });
        })
        .catch(err => console.log("Error while saving test " + err));
    })
    .catch(err => {
      console.log("Error finding test schema " + err);
    });
});

module.exports = router;
