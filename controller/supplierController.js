const Supplier = require("../models/supplier");

exports.addSupplier = async (req, res) => {
  const suppliers = new Supplier({
    name: req.body.name,
    phone: req.body.phone,
    address: req.body.address,
    opening_balance: req.body.opening_balance,
  });
  try {
    const response = await suppliers.save();
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

exports.addCashIn = async (req, res) => {
  const cashObject = {
    amount: req.body.amount,
    cash_type: "Cash In",
    description: req.body.description,
    payment_medium: req.body.payment_medium,
    submit_date: req.body.submit_date,
  };
  try {
    const response = await Supplier.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          cash: cashObject,
        },
      }
      // function (error, success) {
      //   if (error) {
      //     console.log("-------------Error------------------");
      //     console.log(error);
      //     console.log("-------------Error------------------");
      //   } else {
      //     console.log(success);
      //   }
      // }
    );
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

exports.addCashOut = async (req, res) => {
  const cashObject = {
    amount: req.body.amount,
    cash_type: "Cash Out",
    description: req.body.description,
    payment_medium: req.body.payment_medium,
    submit_date: req.body.submit_date,
  };
  try {
    const response = await Supplier.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          cash: cashObject,
        },
      }
    );
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

exports.getCashInById = async (req, res) => {
  try {
    const cash_data = await Supplier.find({ _id: req.params.id });
    const data = [];
    for (var i = 0; i < cash_data[0].cash.length; i++) {
      if (cash_data[0].cash[i].cash_type === "Cash In") {
        data.push(cash_data[0].cash[i]);
      }
    }
    if (cash_data.length !== 0) {
      res.json({ error: false, data: data });
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

exports.getAllCashIn = async (req, res) => {
  try {
    const cash_data = await Supplier.find();
    let cashArray = [];
    let cashInArray = [];
    let userObject = {};
    for (var i = 0; i < cash_data.length; i++) {
      if (cash_data[i].cash !== undefined) {
        for (var k = 0; k < cash_data[i].cash.length; k++) {
          if (cash_data[i].cash[k].cash_type === "Cash In") {
            cashInArray.push(cash_data[i].cash[k]);
          }
        }
        userObject = {
          _id: cash_data[i]._id,
          name: cash_data[i].name,
          phone: cash_data[i].phone,
          address: cash_data[i].address,
          opening_balance: cash_data[i].opening_balance,
          status: true,
          cash: cashInArray,
        };
        cashArray.push(userObject);
        cashInArray = [];
      }
    }
    if (cash_data.length !== 0) {
      res.json({ error: false, data: cashArray });
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

exports.getCashOutById = async (req, res) => {
  try {
    const cash_data = await Supplier.find({ _id: req.params.id });
    const data = [];
    for (var i = 0; i < cash_data[0].cash.length; i++) {
      if (cash_data[0].cash[i].cash_type === "Cash Out") {
        data.push(cash_data[0].cash[i]);
      }
    }
    if (cash_data.length !== 0) {
      res.json({ error: false, data: data });
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

exports.getAllCashOut = async (req, res) => {
  try {
    const cash_data = await Supplier.find();
    let cashArray = [];
    let cashInArray = [];
    let userObject = {};
    for (var i = 0; i < cash_data.length; i++) {
      if (cash_data[i].cash !== undefined) {
        for (var k = 0; k < cash_data[i].cash.length; k++) {
          if (cash_data[i].cash[k].cash_type === "Cash Out") {
            cashInArray.push(cash_data[i].cash[k]);
          }
        }
        userObject = {
          _id: cash_data[i]._id,
          name: cash_data[i].name,
          phone: cash_data[i].phone,
          address: cash_data[i].address,
          opening_balance: cash_data[i].opening_balance,
          status: true,
          cash: cashInArray,
        };
        cashArray.push(userObject);
        cashInArray = [];
      }
    }
    if (cash_data.length !== 0) {
      res.json({ error: false, data: cashArray });
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

exports.getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    if (suppliers.length !== 0) {
      res.json({ error: false, suppliers: suppliers });
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

exports.getSuppliersCashFlow = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    if (suppliers.length !== 0) {
      let cashModel = {};
      let cashFlow = [];
      for (let i = 0; i < suppliers.length; i++) {
        console.log("supplier array length: ", suppliers.length);
        if (suppliers[i].cash !== undefined) {
          for (let k = 0; k < suppliers[i].cash.length; k++) {
            console.log("cash array length: ", suppliers[i].cash.length);
            cashModel = {
              supplier_id: suppliers[i]._id,
              supplier_name: suppliers[i].name,
              cash_in_amount: suppliers[i].cash[k].cash_type === "Cash In" ? suppliers[i].cash[k].amount : 0,
              cash_out_amount: suppliers[i].cash[k].cash_type === "Cash Out" ? suppliers[i].cash[k].amount : 0,
              cash_type: suppliers[i].cash[k].cash_type,
              description: suppliers[i].cash[k].description,
              payment_medium: suppliers[i].cash[k].payment_medium,
              submit_date: suppliers[i].cash[k].submit_date,
              _id: suppliers[i].cash[k]._id,
              updated_at: suppliers[i].cash[k].updatedAt,
              created_at: suppliers[i].cash[k].createdAt,
            };
            cashFlow.push(cashModel);
          }
        }
      }
      res.json({ error: false, cash_flow: cashFlow });
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
    const response = await Supplier.findById(req.params.id);
    res.json({ error: false, supplier: response });
  } catch (err) {
    res.json({
      error: true,
      error_msg: "No Data Found",
      response: err.toString(),
    });
  }
};

exports.updateById = async (req, res) => {
  try {
    const response = await Supplier.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          phone: req.body.phone,
          address: req.body.address,
          opening_balance: req.body.opening_balance,
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
    const response = await Supplier.updateOne(
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
    const response = await Supplier.deleteOne({ _id: req.params.id });
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
