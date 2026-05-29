import express from 'express';

const route = express.Router();

route.get('/', getAllProduct);

export default route;
