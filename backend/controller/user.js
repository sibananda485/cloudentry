const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const secretKey = "shiva";

const handleNewUser = async (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    try {
      const result = await User.create({ ...req.body, password: hashedPass });

      return res.status(201).json({
        message: "User created and loggedin successFully",
        token: jwt.sign({ id: result._id }, secretKey),
      });
    } catch (e) {
      return res.status(401).json({ message: "User Exists" });
    }
  }
  res.status(400).json({ message: `Invalid ${result.array()[0].path}` });
};

const handleLogin = async (req, res) => {
  const result = validationResult(req);
  console.log(req.body);
  if (result.isEmpty()) {
    try {
      const { email, password } = req.body;
      const foundUser = await User.findOne({ email });
      if (!foundUser)
        return res.status(404).json({ message: "No user Exists" });
      const auth = await bcrypt.compare(password, foundUser?.password);
      if (auth) {
        return res.json({
          message: "Loggedin successFully",
          username: foundUser.name,
          token: jwt.sign({ id: foundUser._id }, secretKey),
        });
      } else {
        return res.status(401).json({ message: "Wrong Password" });
      }
    } catch (e) {
      return res.status(500).json({ message: "internal server error" });
    }
  }
  res.status(400).json({ message: `Invalid ${result.array()[0].path}` });
};

const handleGetUser = async (req, res) => {
  try {
    const result = await User.findById(req.payload.id);
    res.json(result);
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports = { handleNewUser, handleLogin, handleGetUser };
