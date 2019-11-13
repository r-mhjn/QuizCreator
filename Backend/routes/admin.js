const bcrypt = require("bcrypt");
const jsonwt = require("jsonwebtoken");
const passport = require("passport");
const express = require("express");
const router = express.Router();
const myKey = process.env.SECRET;

// importing routes
const quizRouter = require("./adminRoutes/quiz");
const testRouter = require("./adminRoutes/test");

// adding on the the strategy
require("../strategies/adminAuth")(passport);

// Import  for Admin to Register
const Admin = require("../models/Admin");

// @type    GET
// @route   /admin
// @desc    just for testing
// @access PUBLIC
router.get("/", (req, res) => {
  res.json({ test: "Auth Admin is being tested" });
});

// @type     POST
// @route    /admin/register
// @desc     route for registeration of admins
// @access   PUBLIC
// The admin might already be registers and may be trying to re-register so this check is a must
router.post("/register", (req, res) => {
  console.log(req.body);
  Admin.findOne({ email: req.body.email })
    .then(admin => {
      if (admin) {
        return res
          .status(400)
          .json({ emailerror: "Email is already registered." });
      } else {
        const newAdmin = new Admin({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
        // Encrypt password using bcrypt   ...here 10 = saltRounds
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newAdmin.password, salt, (err, hash) => {
            // Store hash in your password DB.
            if (err) {
              throw err;
            }
            newAdmin.password = hash;
            newAdmin
              .save()
              .then(admin => res.json("admin added!" + admin)) //TODO: dont send admin
              .catch(err =>
                console.log("error while saving the admin to database" + err)
              );
          });
        });
      }
    })
    .catch(err => console.log(err));
});

// @type     POST
// @route    /admin/login
// @desc     route for login of admins
// @access   PUBLIC

router.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  Admin.findOne({ email })
    .then(admin => {
      if (!admin) {
        return res
          .status(404)
          .json({ emailErr: "Admin not found with this email" });
      }
      // if the admin is present then we must compare the admin
      if (admin) {
        bcrypt
          .compare(password, admin.password)
          .then(isCorrect => {
            if (isCorrect) {
              //res.json({success: "admin logged in sucessfully"});
              // use/creating payload and create token for admin
              const payload = {
                id: admin.id,
                name: admin.name,
                email: admin.email
              };
              jsonwt.sign(payload, myKey, { expiresIn: "3h" }, (err, token) => {
                if (err) {
                  throw err;
                } else {
                  return res.json({
                    sucess: true,
                    token: "Bearer " + token
                  });
                }
              });
            } else {
              return res
                .status(400)
                .json({ passwordErr: "Password is not correct" });
            }
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
});

router.use(
  "/quiz",
  passport.authenticate("admin", { session: false }),
  quizRouter
);
router.use(
  "/test",
  passport.authenticate("admin", { session: false }),
  testRouter
);
module.exports = router;
