import { Product } from "../models/product.model.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";


// ---- Get all products ----
const getAllProducts = asyncHandler(async (req, res) => {

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

  return res.status(200).json(new ApiResponse(200, products, "Products fetched successfully"));
});