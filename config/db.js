const mongoose = require("mongoose");
require("dotenv").config();
exports.dbConn = async () => {
  try {
    const dbURL = process.env.dbURL;
    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Database connected`);
  } catch (err) {
    console.log(`Database connection error ${err.message}`);
  }
};
