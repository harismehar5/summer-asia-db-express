const Sale = require("../models/sale");

exports.addSale = async (req, res) => {
  if (
    req.body.order_details === null ||
    req.body.order_details === undefined ||
    req.body.order_details.length <= 0
  ) {
    res.json({
      error: true,
      error_msg: "Something went wrong...!",
    });
  } else {
    const product_list = [];
    for (let i = 0; i < req.body.order_details.length; i++) {
      product_list.push({
        quantity: req.body.order_details[i].quantity,
        amount: req.body.order_details[i].amount,
        product: req.body.order_details[i].product_id,
      });
    }
    const sales = new Sale({
      total_amount: req.body.total_amount,
      total_quantity: req.body.total_quantity,
      customer: req.body.customer,
      submit_date: req.body.submit_date,
      order_details: product_list,
    });
    try {
      const response = await sales.save();
      res.json({
        error: false,
        success_msg: "Data submitted successfully",
        response: response,
      });
    } catch (err) {
      res.json({
        error: true,
        error_msg: "Something went wrong...!",
        response: err.toString(),
      });
    }
  }
};

exports.getSale = async (req, res) => {
  try {
    const sales = await Sale.find().populate({
      path: "customer",
      select: "name",
    });
    if (sales.length !== 0) {
      res.json({ error: false, sales: sales });
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

exports.getSaleById = async (req, res) => {
  try {
    const sales = await Sale.findOne({ customer: req.params.id }).populate({
      path: "customer",
      select: "name",
    });
    console.log(sales);
    if (sales.length !== 0) {
      res.json({ error: false, sales: sales });
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

exports.deleteById = async (req, res) => {
  try {
    const response = await Sale.deleteOne({ _id: req.params.id });
    res.json({
      error: false,
      success_msg: "Data removed successfully",
      response: response,
    });
  } catch (err) {
    res.json({
      error: true,
      error_msg: "No Data Found",
      response: err.toString(),
    });
  }
};
