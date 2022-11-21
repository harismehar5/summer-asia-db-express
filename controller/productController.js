const Product = require("../models/product");

exports.addProduct = async (req, res) => {
  const products = new Product({
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
    stock_log: req.body.stock_log,
  });
  try {
    const response = await products.save();
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
};
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length !== 0) {
      res.json({ error: false, products: products });
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
exports.getById = async (req, res) => {
  try {
    const response = await Product.findById(req.params.id);
    res.json({ error: false, products: response });
  } catch (err) {
    res.json({
      error: true,
      error_msg: "No Data Found",
      response: err.toString(),
    });
  }
};
exports.addQuantity = async (req, res) => {
  try {
    let product_array = req.body.products;
    const updated_array = product_array.map((obj) => {
      return {
        updateOne: {
          filter: {
            _id: obj.product,
          },
          update: {
            $inc: {
              quantity: obj.quantity,
            },
          },
        },
      };
    });
    // const response = Product.bulkWrite(updated_array);
    // res.json({ error: false, products: response });
    Product.bulkWrite(updated_array)
      .then((response) => {
        res.json({
          error: false,
          response: response,
          success_msg:
            response.nModified > 0
              ? "Data updated successfully"
              : "Query executed but data is not modified",
        });
      })
      .catch((error) => {
        res.json({
          error: true,
          error_msg: "Something went wrong...!",
          response: error.toString(),
        });
      });
  } catch (err) {
    res.json({
      error: true,
      error_msg: "Something went wrong...!",
      response: err.toString(),
    });
  }
};
exports.subtractQuantity = async (req, res) => {
  try {
    let product_array = req.body.products;
    const updated_array = product_array.map((obj) => {
      return {
        updateOne: {
          filter: {
            _id: obj._id,
          },
          update: {
            $inc: {
              quantity: -obj.quantity,
            },
          },
        },
      };
    });
    // const response = Product.bulkWrite(updated_array);
    // res.json({ error: false, products: response });
    Product.bulkWrite(updated_array)
      .then((response) => {
        res.json({
          error: false,
          response: response,
          success_msg:
            response.nModified > 0
              ? "Data updated successfully"
              : "Query executed but data is not modified",
        });
      })
      .catch((error) => {
        res.json({
          error: true,
          error_msg: "Something went wrong...!",
          response: error.toString(),
        });
      });
  } catch (err) {
    res.json({
      error: true,
      error_msg: "Something went wrong...!",
      response: err.toString(),
    });
  }
};
exports.updateById = async (req, res) => {
  try {
    const response = await Product.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          price: req.body.price,
          quantity: req.body.quantity,
        },
      }
    );
    res.json({
      error: false,
      success_msg: "Data updated successfully",
      response: response,
    });
  } catch (err) {
    res.json({
      error: true,
      error_msg: "Something went wrong...!",
      response: err.toString(),
    });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const response = await Product.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: req.body.status,
        },
      }
    );
    res.json({
      error: false,
      success_msg: "Data updated successfully",
      response: response,
    });
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
    const response = await Product.deleteOne({ _id: req.params.id });
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
