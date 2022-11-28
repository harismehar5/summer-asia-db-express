const express = require("express")
const router = express.Router()
const PurchaseController = require("../controller/purchaseController")

router.post("/add_purchase", PurchaseController.addPurchase)
router.get("/get_purchase", PurchaseController.getPurchase)

router
  .route("/:id")
  .get(PurchaseController.getById)
  .delete(PurchaseController.deleteById);

module.exports = router