import app from './src/app.js';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';

// ---- Load environment variables ----
dotenv.config();

// ---- Get port from environment variables ----
const port = process.env.PORT || 4000;

// ---- Connect to MongoDB database ----
connectDB();

// ---- Start server ----
app.listen(port, () => {
    console.log(`✅ Server is connnected on: http://localhost:${port}`);
});