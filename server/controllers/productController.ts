import type { Response, Request } from "express";
import Product from "../models/product.ts";

const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.find();

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error: unknown) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, currency, stock } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      currency,
      stock,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error: unknown) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error: unknown) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { getProduct, createProduct, getProductById };