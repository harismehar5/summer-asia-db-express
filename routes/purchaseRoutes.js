const express = require("express")
const router = express.Router()
const PurchaseController = require("../controller/purchaseController")

router.post("/add_purchase", PurchaseController.addPurchase)
router.get("/get_purchase", PurchaseController.getPurchase)
router.get("/:id", PurchaseController.getPurchaseById)



module.exports = router