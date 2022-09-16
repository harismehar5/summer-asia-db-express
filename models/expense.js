const mongoose = require("mongoose");

const Expense = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", Expense);
