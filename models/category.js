const mongoose = require("mongoose");


const Category = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
  // stock_log: [stockLog],
});

module.exports = mongoose.model("Category", Category);
