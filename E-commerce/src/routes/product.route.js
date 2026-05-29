import express from 'express';
import { getAllProduct } from '../controllers/product.controller.js';

const route = express.Router();

route.get('/', getAllProduct);

export default route;
