const express = require("express")
const router = express.Router()
const StockController = require("../controller/stockController")

router.post("/add_stock_log", StockController.AddStockLog)
router.get("/get_stock_log", StockController.getStocks)

module.exports = router