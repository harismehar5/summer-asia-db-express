const mongoose = require("mongoose");

const Cash = new mongoose.Schema(
  {
    amount: {
      type: String,
      required: true,
      default: 0,
    },
    cash_type: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    payment_medium: {
      type: String,
      required: false,
    },
    submit_date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = Cash;
