import type { Request, Response } from "express";
import stripe from "../config/stripe.ts";
import Order from "../models/order.ts";
import Stripe from "stripe";



// so yha payment intennt or [payment checkout flow hai ye dono ko hum ek dusre ke alternative kah sakte hai yha par but the diff is checkout privide us built in  UI while payment interne me 
// payment internt me hme khud se custom UI bnana padta hai]
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

    //the client secret form during payment intent create
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

//separate contorller router

const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    // 1. Find order
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // 2. Check order status
    if (order.orderStatus === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Cannot checkout a cancelled order",
      });
    }

    // 3. Check payment status
    if (order.paymentStatus === "paid") {
      return res.status(400).json({
        success: false,
        message: "Order is already paid",
      });
    }

    // 4. Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      line_items: order.items.map((item) => ({
        price_data: {
          currency: order.currency.toLowerCase(),

          product_data: {
            name: item.name,
          },

          unit_amount: item.price * 100,
        },

        quantity: item.quantity,
      })),

      success_url: `${process.env.CLIENT_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${process.env.CLIENT_URL}/payment/cancel`,

      metadata: {
        orderId: order._id.toString(),
      },
    });

    // 5. Save Stripe session ID in our order
    order.stripeSessionId = session.id;

    await order.save();

    // 6. Send Checkout URL to frontend
    return res.status(200).json({
      success: true,
      message: "Stripe Checkout Session created",
      checkoutUrl: session.url,
      sessionId: session.id,
    });
  } catch (error: unknown) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create Stripe Checkout Session",
    });
  }
};


export { createPaymentIntent,createCheckoutSession };
