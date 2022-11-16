const Customer = require("../models/customer");

exports.addCustomer = async (req, res) => {
  const customers = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    address: req.body.address,
    opening_balance: req.body.opening_balance,
  });
  try {
    const response = await customers.save();
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
    const response = await Customer.findOneAndUpdate(
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
    const response = await Customer.findOneAndUpdate(
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
    const cash_data = await Customer.find({ _id: req.params.id });
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
    const cash_data = await Customer.find();
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
    const cash_data = await Customer.find({ _id: req.params.id });
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
    const cash_data = await Customer.find();
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

exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    if (customers.length !== 0) {
      res.json({ error: false, customers: customers });
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

exports.getCustomersCashFlow = async (req, res) => {
  try {
    const customers = await Customer.find();
    if (customers.length !== 0) {
      const cashModel = {};
      const cashFlow = []
      for (let i = 0; i < customers.length; i++) {
        for (let k = 0; k < customers[i].cash.length; k++)
          cashModel = {
            customer_id: customers[i]._id,
            customer_name: customers[i].name,
            amount: customers[i].name.cash[k].amount,
            cash_type: customers[i].name.cash[k].cash_type,
            description: customers[i].name.cash[k].description,
            payment_medium: customers[i].name.cash[k].payment_medium,
            submit_date:customers[i].name.cash[k].submit_date,
            _id:customers[i].name.cash[k]._id,
            updated_at: customers[i].name.cash[k].updatedAt,
            created_at: customers[i].name.cash[k].createdAt,
          };
          cashFlow.push(cashModel)
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
    const response = await Customer.findById(req.params.id);
    res.json({ error: false, customer: response });
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
    const response = await Customer.updateOne(
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
    const response = await Customer.updateOne(
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
    const response = await Customer.deleteOne({ _id: req.params.id });
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
