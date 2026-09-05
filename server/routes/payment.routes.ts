
import express from "express";
import { createPaymentIntent } from "../controllers/paymentController.ts"
const router = express.Router();

router.post("/create-payment-intent", createPaymentIntent);

export default router;

