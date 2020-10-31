const nodemailer = require("nodemailer");
// require("dotenv").config();
// console.log(process.env.CLOUD_NAME);
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.YOUR_MAIL,
    pass: process.env.YOUR_PASS,
  },
});
function fun(to, sub, text) {
  let mailOptions = {
    from: YOUR_EMAIL,
    to: to,
    subject: sub,
    text: text,
  };
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) console.log("err occured", err);
    // else console.log("mail sent");
  });
}
module.exports = fun;
