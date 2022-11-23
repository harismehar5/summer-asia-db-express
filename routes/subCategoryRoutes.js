const express = require("express");
const router = express.Router();

const SubCategoryController = require("../controller/subCategoryController");
router.post("/add_sub_category", SubCategoryController.addSubCategory);
router.get("/get_sub_categories", SubCategoryController.getSubCategories);
router.get("/update_status/:id", SubCategoryController.updateStatus);

router
  .route("/:id")
  .get(SubCategoryController.getById)
  .patch(SubCategoryController.updateById)
  .delete(SubCategoryController.deleteById);

module.exports = router;
