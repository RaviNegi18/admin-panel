import { Router } from "express";
import {
  createProduct,
  getProduct,
  getProductById,
} from "../controllers/productController.ts";

const router = Router();

router.get("/product", getProduct);
router.post("/product", createProduct);
router.get("/product/:id", getProductById);

export default router;