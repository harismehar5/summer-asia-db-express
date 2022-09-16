const mongoose = require("mongoose");

const stockLog = new mongoose.Schema({
  stock_type: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
    required: false,
  },
  quantity: {
    type: Number,
    required: false,
    default: 0,
  },
});
const Product = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
  stock_log: [stockLog],
});

module.exports = mongoose.model("Product", Product);
