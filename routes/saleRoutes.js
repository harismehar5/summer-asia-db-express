const express = require("express")
const router = express.Router()
const SaleController = require("../controller/saleController")

router.post("/add_sale", SaleController.addSale)


module.exports = router