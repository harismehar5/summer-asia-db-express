const express = require("express");
const router = express.Router();
const CustomerController = require("../controller/customerController");

router.post("/add_customer", CustomerController.addCustomer);
router.patch("/add_cash_in/:id", CustomerController.addCashIn);
router.patch("/add_cash_out/:id", CustomerController.addCashOut);

router.get("/get_customers", CustomerController.getCustomers);
router.get("/get_cash_in_by_id/:id", CustomerController.getCashInById);
router.get("/get_cash_out_by_id/:id", CustomerController.getCashOutById);
router.get("/get_all_cash_in_customer", CustomerController.getAllCashIn);
router.get("/get_all_cash_out_customer", CustomerController.getAllCashOut);

router.get("/update_status/:id", CustomerController.updateStatus);
router
  .route("/:id")
  .get(CustomerController.getById)
  .patch(CustomerController.updateById)
  .delete(CustomerController.deleteById);
module.exports = router;
