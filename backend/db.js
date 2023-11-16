const mongoose = require("mongoose");

// Function to connect to database
async function connectToDb(url) {
  try {
    const status = await mongoose.connect(url);
    console.log("connected successfully");
  } catch (e) {
    console.log("Error in db connection",e);
  }
}

module.exports = connectToDb;
