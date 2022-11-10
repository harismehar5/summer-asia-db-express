const mongoose = require("mongoose");

const OrderDetails = new mongoose.Schema({
  quantity: {
    type: Number,
    required: [true, 'Please Enter Product Quantity'],
    default: 0,
  },
  amount: {
    type: Number,
    required: [true, 'Please Enter Product Amount'],
    default: 0,
  },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
});
module.exports = mongoose.model("OrderDetails", OrderDetails);
