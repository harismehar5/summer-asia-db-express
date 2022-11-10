const express = require("express")
const router = express.Router()
const SaleController = require("../controller/saleController")

router.post("/add_sale", SaleController.addSale)
router.post("/get_sale", SaleController.getSale)



module.exports = router