var express = require("express");
var app = express();
var { uploadImageFn, getImagesFn } = require("./cloudinary.js");
var cors = require("cors");
var URL = "http://localhost:3000";
app.use(
  cors({
    origin: URL,
    credentials: true,
  })
);

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var session = require("express-session");
app.use(
  session({
    secret: "my_secret",
    resave: true,
    saveUninitialized: true,
  })
);
var cookieParser = require("cookie-parser");
app.use(cookieParser("my_secret"));
var bcrypt = require("bcryptjs");
var passport = require("passport");
var localStrategy = require("passport-local").Strategy;
var passportLocalMongoose = require("passport-local-mongoose");
var mongoose = require("mongoose");
mongoose
  .connect(" mongodb://localhost/snap_snap_data", {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to database");
  });
// console.log(User);
app.use(passport.initialize());
app.use(passport.session());
var authFn = require("./auth/passportConfig.js");
authFn(passport);
var my_Obj = {
  my_Username: "",
};
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log("there is an error");
    }
    if (!user) {
      res.send("invalid credentials");
    } else if (user && user.isConfirmed === false) {
      res.send("confirm your email");
    } else {
      // console.log("valid");
      my_Obj = {
        my_Username: req.body.username,
      };
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("succesfully authenticated");
      });
    }
  })(req, res, next);
});
app.get("/", (req, res) => {
  res.send("WE ARE LIVE");
});
app.get("/getUser", (req, res) => {
  res.send(my_Obj.my_Username);
});
var { collectEmail, confirmEmail } = require("./emailAuth/emailConfirmer.js");
app.post("/confirmEmail", (req, res) => {
  confirmEmail(my_Obj, req.body.id, res);

});
app.post("/register", (req, res) => {

  collectEmail(req.body.username, req.body.password, res);
});
app.post("/setEmail", (req, res) => {
  my_Obj = {
    my_Username: req.body.your_email,
  };
  res.send("success");
});
app.post("/logout", (req, res) => {
  my_Obj = {
    my_Username: "",
  };
  // console.log(my_Obj.my_Username);
});
app.get("/cloud/getImages", (req, res) => {
  console.log("get  ");
  getImagesFn(my_Obj.my_Username).then((d) => {
    res.send(d);
  });
});
app.post("/cloud/API", (req, res) => {
  uploadImageFn(req.body.imageUrl, req.body.username);
  res.send("uploaded");
});
var port = process.env.PORT || 2020;
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
