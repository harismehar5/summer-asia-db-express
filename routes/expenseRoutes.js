const express = require('express')
const router = express.Router()
const ExpenseController = require('../controller/expenseController')

router.post("/add_expense", ExpenseController.addExpense)
router.get("/get_expenses", ExpenseController.getExpenses)
router.get("/update_status/:id", ExpenseController.updateStatus)
router.route("/:id")
.get(ExpenseController.getById)
.patch(ExpenseController.updateById)
.delete(ExpenseController.deleteById)
module.exports = router