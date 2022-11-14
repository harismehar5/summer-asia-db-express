const Purchase = require("../models/purchase");

exports.addPurchase = async (req, res) => {
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
    const purchases = new Purchase({
      total_amount: req.body.total_amount,
      total_quantity: req.body.total_quantity,
      customer: req.body.customer,
      submit_date: req.body.submit_date,
      order_details: product_list,
    });
    try {
      const response = await purchases.save();
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

exports.getPurchase = async (req, res) => {
  try {
    const purchases = await Purchase.find();
    if (purchases.length !== 0) {
      res.json({ error: false, purchases: purchases });
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

exports.getPurchaseById = async (req, res) => {
  try {
    const purchases = await Purchase.aggregate([
      {
        $match: { _id: req.params.id },
      },
      {
        $lookup: {
          from: "Supplier",
          localField: "supplier",
          foreignField: "_id",
          as: "customers",
        },
      },
    ]);
    if (purchases.length !== 0) {
      res.json({ error: false, purchases: purchases });
    } else {
      res.json({
        error: true,
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
