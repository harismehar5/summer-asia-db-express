const express = require("express")
const router = express.Router()
const SaleController = require("../controller/saleController")

router.post("/add_sale", SaleController.addSale)
router.get("/get_sale", SaleController.getSale)
router.get("/:id", SaleController.getSaleById)



module.exports = router