var User = require("../models/user.js");
var sendMail = require("../sendMail.js");
var bcrypt = require("bcryptjs");
function collectEmail(email, password, res) {
  User.findOne({ username: email }, async (err, found) => {
    if (!found) {
      // console.log("not found");
      var hashedPass = await bcrypt.hash(password, 10);
      User.create(
        { username: email, password: hashedPass, isConfirmed: false },
        (err, made) => {
          if (err) throw err;
          else {
            // console.log(made);
            var url = `http://localhost:3000/confirmEmail/${made._id}`;
            var sub = " Snapshot Keeper Account activation ";
            var text = `Please click on the link to activate your account ${url}`;
            sendMail(email, sub, text);
            res.send("created the user");
          }
        }
      );
    }
  });
}
function confirmEmail(my_Obj, id, res) {
  User.findById(id, (err, user) => {
    if (err) throw err;
    if (!user) {
      // console.log("no user");
    } else if (user && user.isConfirmed === false) {
      User.findByIdAndUpdate(id, { isConfirmed: true }, (err, u) => {
        if (err) throw err;
        res.send("confirm your account");
        // else console.log(u);
      });
      // console.log("found and updated");
      my_Obj.my_Username = user.username;
    } else {
      res.send("already confirmed");
      // my_Obj.my_Username = user.username;
      // console.log("already confirmed");
    }
  });
}
module.exports = { collectEmail, confirmEmail };
