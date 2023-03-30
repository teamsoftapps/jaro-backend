const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    driverName: {
      type: String,
      // required: true,
    },
    orderNumber: {
      type: String,
      // required: true,
    },
    pickupNumber: {
      type: String,
      // required: true,
    },
    location: {
      type: String,
      // required: true,
    },
    driverCoordinates: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model("User", UserSchema);
