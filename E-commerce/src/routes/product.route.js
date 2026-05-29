import express from 'express';
import { createProduct, getAllProducts, getProductById } from '../controllers/product.controller.js';
import verifyJWT from '../middlewares/auth.middleware.js';

const route = express.Router();

route.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', verifyJWT, createProduct);

export default route;
