
import type { Request, Response } from "express";
import stripe from "../config/stripe.ts";
import Order from "../models/order.ts";

const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.body;

    // 1. Check orderId
    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required",
      });
    }

    // 2. Find order
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // 3. Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.totalAmount * 100),
      currency: order.currency.toLowerCase(),
      metadata: {
        orderId: order._id.toString(),
        userId: order.user.toString(),
      },
    });

    // 4. Save Stripe PaymentIntent ID in our Order
    order.stripePaymentIntentId = paymentIntent.id;
    await order.save();

    // 5. Send clientSecret to frontend
    return res.status(200).json({
      success: true,
      message: "PaymentIntent created successfully",
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: unknown) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create PaymentIntent",
    });
  }
};

export { createPaymentIntent };

