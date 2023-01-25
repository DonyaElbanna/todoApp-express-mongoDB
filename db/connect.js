const mongoose = require("mongoose");

// to suppress the strictQuery warning
mongoose.set("strictQuery", true);

const connectDB = (url) => {
  return mongoose.connect(url);
};

module.exports = connectDB;
