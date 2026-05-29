import express from 'express';
import { createProduct, getAllProducts, getProductById } from '../controllers/product.controller.js';

const route = express.Router();

route.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);

export default route;
