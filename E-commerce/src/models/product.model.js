import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        trim: true,
    },
    images: [
        {
            type: String,
            trim: true,
        },
    ],
},
    {
        timestamps: true
    }
);

export const Product = mongoose.model("Product", productSchema);
