const express = require("express");
const router = express.Router();

const ProductController = require("../controller/productController");
router.post("/add_product", ProductController.addProduct);
router.get("/get_products", ProductController.getProducts);
router.get("/update_status/:id", ProductController.updateStatus);
router.post("/add_quantity", ProductController.addQuantity);
router.post("/subtract_quantity", ProductController.subtractQuantity);
router.put("/stock_in/:id", ProductController.addQuantity);
router.put("/stock_out/:id", ProductController.subtractQuantity);
router
  .route("/:id")
  .get(ProductController.getById)
  .patch(ProductController.updateById)
  .delete(ProductController.deleteById);

module.exports = router;
