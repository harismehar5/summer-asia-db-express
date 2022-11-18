const mongoose = require("mongoose");

const StockLog = new mongoose.Schema({
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
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
});
module.exports = mongoose.model("Stock", StockLog);
