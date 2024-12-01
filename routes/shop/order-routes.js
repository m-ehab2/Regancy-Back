const express = require("express");

const {
  createOrder,
  getAllOrdersByUser,
  getOrderDetails,
  capturePayment,
  createOrderWithStripe,
  capturePaymentByStripe,
} = require("../../controllers/shop/order-controller");

const router = express.Router();

router.post("/create", createOrder);
router.post("/create-strip", createOrderWithStripe);
router.post("/capture", capturePayment);
router.post("/captureStripe", capturePaymentByStripe);
router.get("/list/:userId", getAllOrdersByUser);
router.get("/details/:id", getOrderDetails);

module.exports = router;
