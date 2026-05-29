import { Product } from "../models/product.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";


// ---- Get all products ----
export const getAllProducts = asyncHandler(async (req, res) => {

  // ---- Client side data ----
  const { category } = req.query;

  let products;

  // ----If category exists get category products ----
  if (category) {
    products = await Product.find({ category: category });
  } else {
    // ---- Get all products ----
    products = await Product.find();
  }

  // ---- Success response send to client ----
  return res.status(200).json(new ApiResponse(200, products, "Products fetched successfully"));
});

// ---- Get product by id ----
export const getProductById = asyncHandler(async (req, res) => {

  // ---- Client side data ----
  const { id } = req.params;

  // ---- Find product in MongoDB ----
  const product = await Product.findById(id);
 
  // ---- Throw if product not found in MongoDB ----
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // ---- Success response send to client ----
  return res.status(200).json(new ApiResponse(200, product, "Product fetched successfully"));
});