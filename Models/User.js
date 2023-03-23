const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    driverName: {
      type: String,
      required: true,
    },
    orderNumber: {
      type: String,
      required: true,
    },
    pickupNumber: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model("User", UserSchema);
