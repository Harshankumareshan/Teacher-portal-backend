const express = require("express");
const { UserModel } = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Increased salt rounds for stronger security
    const user = new UserModel({ name, email, password: hashedPassword });
    await user.save();
    res.status(200).json({
      message: "User created",
      status: 1
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      status: 0
    });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const option = {
    expiresIn: "50m"
  };

  try {
    const data = await UserModel.find({ email });
    if (data.length > 0) {
      const isPasswordValid = await bcrypt.compare(password, data[0].password);
      if (isPasswordValid) {
        const token = jwt.sign({ userId: data[0]._id }, "harshan", option);
        console.log('Generated token:', token); // Log the generated token
        res.send({
          message: "User logged in successfully",
          token: token,
          status: 1
        });
      } else {
        res.send({
          message: "Invalid credentials",
          status: 0
        });
      }
    } else {
      res.send({
        message: "User does not exist",
        status: 0
      });
    }
  } catch (error) {
    res.send({
      message: error.message,
      status: 0
    });
  }
});

module.exports = { userRouter };
