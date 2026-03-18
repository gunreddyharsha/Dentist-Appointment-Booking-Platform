const express = require("express");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const validator = require("validator");
const { validataSignupData } = require("../utilis/validateSignUpData");
const { userModel } = require("../schemas/userSchema");
const { authUser } = require("../middleware/auth");
const appRouter = express.Router();

appRouter.get("/profileview", authUser, async (req, res) => {
  try {
    const userData = req.user;
    res.json({ userData });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
});

appRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!validator.isEmail(email)) {
      return res.status(401).json({
        message: "enter valid email",
      });
    }
    const userExist = await userModel.findOne({ email });
    if (!userExist) {
      return res.status(401).json({
        message: "user not exists ",
      });
    }
    const correctPassword = await bcrypt.compare(password, userExist.password);
    if (!correctPassword) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
    const token = await jsonwebtoken.sign({ _id: userExist._id }, "Dentists", {
      expiresIn: "2d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, 
      sameSite: "None", 
    });

    res.status(200).json({
      message: "login successful",
      data: userExist,
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
});

appRouter.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName, role } = req.body;
  try {
    validataSignupData(req.body, res);

    const findUser = await userModel.findOne({ email });

    if (findUser) {
      return res.status(401).json({
        message: "user already exists",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      email,
      password: hashPassword,
      firstName,
      lastName,
      role,
    });

    const signupUser = await newUser.save();
    const token = await jsonwebtoken.sign({ _id: signupUser._id }, "Dentists", {
      expiresIn: "2d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, 
      sameSite: "None", 
    });
    res.status(200).json({
      message: "signup successful",
      data: signupUser,
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
});

appRouter.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  //res.clearCookie();
  res.json({
    message: "logout Successfullly",
  });
});
module.exports = { appRouter };
