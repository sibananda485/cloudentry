const express = require("express");
const router = express.Router();
const {
  handleNewUser,
  handleLogin,
  handleGetUser,
} = require("../controller/user");
const authToken = require("../middleware/getUserFromToken");
const { body } = require("express-validator");

router
  .post(
    "/createuser", ///End Point
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    handleNewUser
  )
  .post(
    "/login",
    body("email").isEmail(),
    body("password").exists(),
    handleLogin
  ) ///End Point
  .post("/getuser", authToken, handleGetUser);

module.exports = router;
