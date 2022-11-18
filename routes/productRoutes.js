const express = require("express");
const router = express.Router();

const ProductController = require("../controller/productController");
router.post("/add_product", ProductController.addProduct);
router.get("/get_products", ProductController.getProducts);
router.get("/update_status/:id", ProductController.updateStatus);
router.patch("/add_quantity", ProductController.addQuantity);
router
  .route("/:id")
  .get(ProductController.getById)
  .patch(ProductController.updateById)
  .delete(ProductController.deleteById);

module.exports = router;
