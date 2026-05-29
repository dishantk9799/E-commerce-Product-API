import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        default: ""
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        default: "general"
    },
    images: {
        type: [String],
        default: []
    },
},
    {
        timestamps: true
    }
);

export const Product = mongoose.model("Product", productSchema);
