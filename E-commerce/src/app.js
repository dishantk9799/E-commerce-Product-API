import express from 'express';

const app = express();

app.use(express.json());

app.use('/products', productRoutes);


app.use(errorMiddleware);

export default app;