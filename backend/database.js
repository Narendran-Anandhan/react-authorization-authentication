const mongoose = require("mongoose");

require("dotenv").config();

// database init
var con = mongoose
  .connect(process.env.MONGODB_URL, {
   // useUnifiedTopology: true,
   // useNewUrlParser: true,
   // useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to database...");
  })
  .catch((error) => {
      console.log(error);
    console.log("failed connected to database");
  });

  module.exports = con;

  