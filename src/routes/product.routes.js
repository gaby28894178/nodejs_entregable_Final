import express from "express";
import productController from "../controllers/product.controller.js";
import { authentication } from "../middleware/authentication.js";

const router = express.Router();

// Get all products
router.get("/", productController.getProducts);

// Get product by ID
router.get("/:id", productController.getProductById);

// Create a new product
router.post("/",authentication, productController.createProduct);

// Update a product
router.put("/:id", productController.updateProduct);

// Delete a product
router.delete("/:id", productController.deleteProduct);

export default router;
