import mongoose from "mongoose";

// ---- Connect to MongoDB database ----
const connectDB = async () => {
    try {
        // ---- Establish database connection ----
        const db = await mongoose.connect(process.env.MONGO_DB_URI);
        // ---- Log successful connection ----
        console.log(`📍 MongoDB is connected: ${db.connection.host}`);
    } catch (error) {
        // ---- Log connection error ----
        console.log("Error in MongoDB connection:", error);
        // ---- Exit application on database failure ----
        process.exit(1);
    }
};

export default connectDB;