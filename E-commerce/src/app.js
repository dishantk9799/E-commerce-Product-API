import express from 'express';

const app = express();

app.use('/products', productRoutes);

export default app;