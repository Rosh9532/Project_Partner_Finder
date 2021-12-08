const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.Signup = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const l_url = req.body.l_url;

  const hashed_password = await bcrypt.hash(password, 10);
  const user = new User({
    Name: name,
    Email: email,
    Password: hashed_password,
    L_Url: l_url,
  });
  //callback and as a paramneter
  user.save((err, data) => {
    if (!err && data) {
      res.status(200).json({
        message: "Successfully stored the user details in databse",
        data: data,
      });
    } else {
      res.status(400).json({
        message: "there is an error while storing the user details",
        error: err,
      });
    }
  });
};

exports.login = async (req, res) => {
  const email = req.body.email;
  //   const password = req.body.password;
  // const pass=req.body.password
  User.findOne({ Email: email }, async (err, data) => {
    if (!err && data) {
      const password = await data.authenticate(req.body.password); //true or false
      //   console.log(password);

      if (password) {
        const token = jwt.sign({ id: data._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        return res.status(200).json({
          token: token,
          message: "u have successfully logged in",
          data: data,
        });
      } else {
        res.status(400).json({
          message: "Invalid Password",
        });
      }
    } else {
      res.status(400).json({
        message: "Email u have entered is not found in the database",
        error: err,
      });
    }
  });
};

exports.profile = (req, res) => {
  // console.log(req.user.id);
  User.findOne({ _id: req.user.id }, (err, data) => {
    if (!err && data) {
      res.status(200).json({
        message: "U r authorized to visit this page.Hence ,u visited",
        user: data,
      });
    } else {
      res.status(400).json({
        message: "User not found",
      });
    }
  });
};
