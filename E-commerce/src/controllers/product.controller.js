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


// ---- Create product ----
export const createProduct = asyncHandler(async (req, res) => {

  // ---- Client side data ----
  const { name, description, price, category } = req.body;

  // ---- Validation ----
  if (!name) throw new ApiError(400, "Product name is required");
  if (!price) throw new ApiError(400, "Product price is required");
  if (isNaN(price)) throw new ApiError(400, "Price must be a number");

  // ---- Store multiple image paths ----
  const images = [];

  if (req.files) req.files.forEach((file) => images.push(file.path));

  // ---- Create product in MongoDB ----
  const product = await Product.create({
    name,
    description,
    price,
    category,
    images
  });

  // ---- Success response send to client ----
  return res.status(201).json(new ApiResponse(201, product, "Product created successfully"));
});