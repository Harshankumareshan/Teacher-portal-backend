const mongoose = require("mongoose");
require("dotenv").config();

const connection = async () => {
  try {
    await mongoose.connect(process.env.mongourl);
    console.log("Database is connected");
  } catch (error) {
    console.log("Database connection failed:", error);
  }
};

module.exports = { connection };
