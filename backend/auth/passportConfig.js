var User = require("../models/user.js");
var localStrategy = require("passport-local").Strategy;
var bcrypt = require("bcryptjs");
module.exports = function (passport) {
  passport.use(
    new localStrategy(async (username, password, done) => {
      User.findOne({ username: username }, (err, u) => {
        if (err) throw err;
        if (!u) {
          console.log("invalid credentials");
          return done(null, false);
        } else if (u) {
          bcrypt.compare(password, u.password, (e, ans) => {
            if (e) throw e;
            if (ans === true) {
              return done(null, u);
            } else {
              return done(null, false);
            }
          });
        }
      });
    })
  );
  passport.serializeUser((user, cb) => {
    return cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      return cb(err, user);
    });
  });
};
