const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/User.model");
const { Auth } = require("../middleware/auth");
const userRouter = express.Router();

//Create User

// {
//   "name": "dwipayan",
//   "email": "d@gmail.coim",
//   "gender":"male",
//   "password": "12ab@",
//   "age": 23,
//   "city": "Kolkata",
//   "is_married": false
// }

userRouter.post("/register", async (req, res) => {
  try {
    const { name, email, gender, password, age, city, is_married } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(200).send({ msg: "User already exist" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        const user = await UserModel({
          name,
          email,
          gender,
          password: hash,
          age,
          city,
          is_married,
        });
        await user.save();
        res.status(200).send({ msg: "New User Registered!" });
      });
    }
  } catch (error) {
    req.status(400).send({ error: error.message });
  }
});

//User LOGIN

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
          res.status(200).send({ msg: "Login successfull!", token: token });
        } else {
          res.status(400).send({ msg: "Wrong credential!" });
        }
      });
    }
  } catch (error) {
    req.status(400).send({ error: error.message });
  }
});

module.exports = { userRouter };
