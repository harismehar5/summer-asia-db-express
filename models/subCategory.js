const mongoose = require("mongoose");


const SubCategory = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  // stock_log: [stockLog],
});

module.exports = mongoose.model("SubCategory", SubCategory);
