const mongoose = require("mongoose");
// const autoIncrement = require("mongoose-auto-increment");

let Upi = new mongoose.Schema({
  Vpa: {
    type: String,
    unique: false,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
});

const UPI = mongoose.model("UPI", Upi);

module.exports = UPI;
