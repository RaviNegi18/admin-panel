import type { Request, Response } from "express";
import Product from "../models/product.ts";
import Order from "../models/order.ts";

interface OrderItemRequest {
  productId: string;
  quantity: number;
}

interface CreateOrderRequest {
  items: OrderItemRequest[];
}

const createOrder = async (req: Request, res: Response) => {
  try {
    const { items } = req.body as CreateOrderRequest;

    // 1. Basic validation
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order must contain at least one item",
      });
    }

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // 2. Get products from database
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

      // 3. Check stock
      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `${product.name} does not have enough stock`,
        });
      }

      // 4. Check currency
      if (!currency) {
        currency = product.currency;
      }

      if (currency !== product.currency) {
        return res.status(400).json({
          success: false,
          message: "All products must have the same currency",
        });
      }

      // 5. Calculate total from DB price
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

    // 6. Create order
    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalAmount,
      currency,
      orderStatus: "pending",
      paymentStatus: "pending",
    });

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