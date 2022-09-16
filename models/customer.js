const mongoose = require("mongoose");
const Cash = require("./cash");

const Customer = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  opening_balance: {
    type: Number,
    required: true,
    default: 0,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
  cash: {
    type: [Cash],
    default: undefined,
  },
});

module.exports = mongoose.model("Customer", Customer);
