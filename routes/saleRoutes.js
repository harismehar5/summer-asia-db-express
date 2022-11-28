const express = require("express");
const router = express.Router();
const SaleController = require("../controller/saleController");

router.post("/add_sale", SaleController.addSale);
router.get("/get_sale", SaleController.getSale);
router
  .route("/:id")
  .get(SaleController.getSaleById)
  .delete(SaleController.deleteById);

module.exports = router;
