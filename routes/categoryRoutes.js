const express = require("express");
const router = express.Router();

const CategoryController = require("../controller/categoryController");
router.post("/add_category", CategoryController.addCategory);
router.get("/get_categories", CategoryController.getCategories);
router.get("/update_status/:id", CategoryController.updateStatus);

router
  .route("/:id")
  .get(CategoryController.getById)
  .patch(CategoryController.updateById)
  .delete(CategoryController.deleteById);

module.exports = router;
