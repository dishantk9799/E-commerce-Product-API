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

// ---- Update product ----
export const updateProduct = asyncHandler(async (req, res) => {

  // ---- Client side data ----
  const { id } = req.params;
  const { name, description, price, category } = req.body;

  // ---- Validate request body ----
  if (
    !name &&
    !description &&
    !price &&
    !category &&
    (!req.files || req.files.length === 0)
  ) throw new ApiError(400, "At least one field is required to update product");
  if (price !== undefined && isNaN(price)) throw new ApiError(400, "Price must be a number");

  // ---- Find product ----
  const product = await Product.findById(id);

  // ---- Check product exists ----
  if (!product) throw new ApiError(404, "Product not found");

  // ---- Get uploaded images ----
  const images = req.files?.map(file => file.path);

  // ---- Create update object ----
  const updateData = { name, description, price, category };

  // ---- Add images if new images are uploaded ----
  if (images && images.length > 0) updateData.images = images;

  // ---- Update product and return updated document ----
  const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

  // ---- Success response send to client ----
  return res.status(200).json(new ApiResponse(200, updatedProduct, "Product updated successfully"));
});


// ---- Delete product ----
export const deleteProduct = asyncHandler(async (req, res) => {

  // ---- Client side data ----
  const { id } = req.params;

  // ---- Find product ----
  const product = await Product.findById(id);

  // ---- Check product exists ----
  if (!product) throw new ApiError(404, "Product not found");

  // ---- Delete product ----
  await Product.findByIdAndDelete(id);

  // ---- Success response send to client ----
  return res.status(200).json(new ApiResponse(200, {}, "Product deleted successfully"));
});