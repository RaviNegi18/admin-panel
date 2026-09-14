import express from "express"
import { createOrder } from "../controllers/orderController.ts";
import { createCheckoutSession } from "../controllers/paymentController.ts";
const router = express.Router();

router.post("/orders",createOrder)
router.post("/:orderId/checkout", createCheckoutSession);
export default router