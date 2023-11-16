const jwt = require("jsonwebtoken");
const secretKey = "shiva";
const User = require("../models/User")

const getUserFromToken = async(req, res, next) => {
  const token = req.header("auth-token");

  const payload = jwt.decode(token, secretKey);
  if (payload) {
    const user = await User.findById(payload.id);
    if(user){
      req.payload = payload;
      next();
    }
    else{
      return res.status(401).json({ message: "invalid token" });
    }
  } else {
    return res.status(401).json({ message: "invalid token" });
  }
};

module.exports = getUserFromToken;
