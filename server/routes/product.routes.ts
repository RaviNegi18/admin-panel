import { Router } from "express";
import {
  createProduct,
  getProduct,
  getProductById,
} from "../controllers/productController.ts";

const router = Router();

router.get("/products", getProduct);
router.post("/products", createProduct);
router.get("/products/:id", getProductById);

export default router;