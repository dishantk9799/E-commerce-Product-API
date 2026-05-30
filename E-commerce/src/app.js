import express from 'express';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/products', productRoutes);

app.use(errorMiddleware);

export default app;