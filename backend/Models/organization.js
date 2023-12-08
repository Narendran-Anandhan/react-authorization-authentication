var mongoose = require("mongoose");

var organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Email is required"],
    },
    address: {
      type: String,
      trim: true,
      required: [true, "Address is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Organization", organizationSchema);
