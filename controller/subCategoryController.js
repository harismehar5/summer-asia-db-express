const SubCategory = require("../models/subCategory");

exports.addSubCategory = async (req, res) => {
  const subCategory = new SubCategory({
    name: req.body.name,
    category: req.body.category,
  });
  try {
    const response = await subCategory.save();
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
exports.getSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find().populate({
      path: "category",
      select: "name",
    });
    var sub_category_array = [];
    var sub_category_object = {};
    for (var i = 0; i < subCategories.length; i++) {
      sub_category_object = {
        _id: subCategories[i]._id,
        name: subCategories[i].name,
        status: subCategories[i].status,
        category: subCategories[i].category.name,
      };
      sub_category_array.push(sub_category_object);
    }
    if (subCategories.length !== 0) {
      res.json({ error: false, sub_categories: sub_category_array });
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
    const response = await SubCategory.findById(req.params.id);
    res.json({ error: false, sub_categories: response });
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
    const response = await SubCategory.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
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
    const response = await SubCategory.updateOne(
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
    const response = await SubCategory.deleteOne({ _id: req.params.id });
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
