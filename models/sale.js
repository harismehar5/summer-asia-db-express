const mongoose = require("mongoose");
const OrderDetails = require("./orderDetails");
const Sale = new mongoose.Schema(
  {
    total_amount: {
      type: Number,
      required: true,
      default: 0,
    },
    total_quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    submit_date: {
      type: Date,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
    order_details: {
      type: [OrderDetails.schema],
      default: undefined,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sale", Sale);
