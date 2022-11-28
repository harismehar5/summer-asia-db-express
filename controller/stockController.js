const Stock = require("../models/stock");

exports.AddStockLog = async (req, res) => {
  // const stocks = new Stock({
  //   stock_type: req.body.name,
  //   date: req.body.date,
  //   quantity: req.body.quantity,
  //   product: req.body.product_id,
  // });
  // try {
  //   const response = await stocks.save();
  //   res.json({
  //     error: false,
  //     success_msg: "Data submitted successfully",
  //     response: response,
  //   });
  // } catch (err) {
  //   res.json({
  //     error: true,
  //     error_msg: "Something went wrong...!",
  //     response: err.toString(),
  //   });
  // }
  Stock.insertMany(req.body.stock_log)
    .then((response) => {
      res.json({
        error: false,
        success_msg: "Data submitted successfully",
        response: response,
      });
    })
    .catch((err) => {
      res.json({
        error: true,
        error_msg: "Something went wrong...!",
        response: err.toString(),
      });
    });
};
exports.getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find().populate({
      path: "product",
      select: "name",
    });
    let logObject = {};
    let logArray = [];
    if (stocks.length !== 0) {
      for (var i = 0; i < stocks.length; i++) {
        logObject = {
          _id: stocks[i]._id,
          stock_type: stocks[i].stock_type,
          date: stocks[i].date,
          quantity: stocks[i].quantity,
          product_id: stocks[i].product._id,
          product: stocks[i].product.name,
        };
        logArray.push(logObject);
      }
      res.json({ error: false, stocks: logArray });
    } else {
      res.json({
        error: true,
        error_msg: "No data found...!",
      });
    }
  } catch (err) {
    res.json({
      error: true,
      error_msg: "Something went wrong...!",
      response: err.toString(),
    });
  }
};
