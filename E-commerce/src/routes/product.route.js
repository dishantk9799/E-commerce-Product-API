import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/product.controller.js';
import verifyJWT from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

const router = express.Router();

// ---- Get all products ----
router.get('/', getAllProducts);

// ---- Get single product by id ----
router.get('/:id', getProductById);

// ---- Create new product ----
// ---- Protected route ----
// ---- Accept multiple image uploads ----
router.post('/', verifyJWT, upload.array("images", 5), createProduct);

// ---- Update product by id ----
// ---- Protected route ----
// ---- Accept multiple image uploads ----
router.put("/:id", verifyJWT, upload.array("images", 5), updateProduct);

// ---- Delete product by id ----
// ---- Protected route ----
router.delete('/:id', verifyJWT, deleteProduct);

export default router;
