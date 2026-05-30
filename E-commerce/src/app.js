import express from 'express';
import productRoutes from './routes/product.route.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from "cookie-parser";
import { login } from './controllers/auth.controller.js';

const app = express();

// ---- Parse incoming JSON data ----
app.use(express.json());
// ---- Parse cookies from client requests ----
app.use(cookieParser());


// ---- Admin login route ----
app.post('/login', login);
// ---- Product routes ----
app.use('/products', productRoutes);


// ---- Global error handling middleware ----
app.use(errorMiddleware);

export default app;