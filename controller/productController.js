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
// exports.addQuantity = async (req, res) => {
//   try {
//     const products = await Product.find();
//     if (
//       req.body.stock_log === null ||
//       req.body.stock_log === undefined ||
//       req.body.stock_log.length <= 0
//     ) {
//       res.json({
//         error: true,
//         error_msg: "Something went wrong...!",
//       });
//     } else {
//       for (var i = 0; i < req.body.stock_log.length; i++) {
//         var foundIndex = products.findIndex(
//           (product) => product._id === req.body.stock_log[i].product_id
//         );
//         if (foundIndex > 0) {
//           var id = products[foundIndex]._id;
//           var stock_object = {
//             stock_type: req.body.stock_log[i].stock_type,
//             date: req.body.stock_log[i].date,
//             quantity: req.body.stock_log[i].quantity,
//           };
//           const response = await Product.findOneAndUpdate(
//             { _id: id },
//             {
//               $set: {
//                 quantity: products[foundIndex] + req.body.stock_log[i],
//               },
//             },
//             {
//               $push: {
//                 stock_log: stock_object,
//               },
//             }
//           );
//           res.json({ error: false, response: response });
//         } else {
//           res.json({
//             error: true,
//             error_msg: "Something is not right...!",
//           });
//         }
//       }
//     }
//   } catch (err) {
//     res.json({
//       error: true,
//       error_msg: "Something went wrong...!",
//       response: err.toString(),
//     });
//   }
// };
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
