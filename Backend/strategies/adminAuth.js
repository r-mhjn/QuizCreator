const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const Admin = require("../models/Admin"); // mongoose.model("myUser");
// const myKey = require('../setup/myurl');  // Required this to fetch the secret

var options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.SECRET;

module.exports = passport => {
  passport.use('admin',
    new JwtStrategy(options, (jwt_payload, done) => {
     Admin.findById(jwt_payload.id)
        .then(admin => {
          if (admin) {
            return done(null, admin);
          } else {
            return done(null, false);
          }
        })
        .catch(err => console.log(err));
    })
  );
};

