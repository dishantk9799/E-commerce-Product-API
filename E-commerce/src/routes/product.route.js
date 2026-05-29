import express from 'express';
import { getAllProducts, getProductById } from '../controllers/product.controller.js';

const route = express.Router();

route.get('/', getAllProducts);
router.get('/:id', getProductById);

export default route;
