import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Product from "../models/product.ts";
import Order from "../models/order.ts";

interface OrderItemRequest {
  productId: string;
  quantity: number;
}

interface CreateOrderRequest {
  items: OrderItemRequest[];
}

interface DecodedToken {
  userId: string;
}

const createOrder = async (req: Request, res: Response) => {
  try {
    const { items } = req.body as CreateOrderRequest;

    // 1. Check items
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order must contain at least one item",
      });
    }

    // 2. Get token
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is required",
      });
    }

    // 3. Verify token and get userId
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as DecodedToken;

    // 4. Prepare order data
    const orderItems = [];
    let totalAmount = 0;
    let currency: "INR" | "CAD" | "USD" | null = null;

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.productId}`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `${product.name} does not have enough stock`,
        });
      }

      // First product decides currency
      if (!currency) {
        currency = product.currency;
      }

      // All products must have same currency
      if (currency !== product.currency) {
        return res.status(400).json({
          success: false,
          message: "All products must have the same currency",
        });
      }

      totalAmount += product.price * item.quantity;

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      });
    }

    if (!currency) {
      return res.status(400).json({
        success: false,
        message: "Order currency could not be determined",
      });
    }

    // 5. Create Order
    const order = await Order.create({
      user: decoded.userId,
      items: orderItems,
      totalAmount,
      currency,
      orderStatus: "pending",
      paymentStatus: "pending",
    });

    // 6. Response
    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error: unknown) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { createOrder };