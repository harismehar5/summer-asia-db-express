const express = require('express')
const router = express.Router()
const SupplierController = require('../controller/supplierController')

router.post("/add_supplier", SupplierController.addSupplier)
router.patch("/add_cash_in/:id", SupplierController.addCashIn);
router.patch("/add_cash_out/:id", SupplierController.addCashOut);

router.get("/get_suppliers", SupplierController.getSuppliers)
router.get("/get_cash_in_by_id/:id", SupplierController.getCashInById);
router.get("/get_cash_out_by_id/:id", SupplierController.getCashOutById);
router.get("/get_all_cash_in_supplier", SupplierController.getAllCashIn);
router.get("/get_all_cash_out_supplier", SupplierController.getAllCashOut);

router.get("/update_status/:id", SupplierController.updateStatus)
router.route("/:id")
.get(SupplierController.getById)
.patch(SupplierController.updateById)
.delete(SupplierController.deleteById)
module.exports = router