import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";

// ---- Admin login ----
export const login = asyncHandler(async (req, res) => {

    // ---- Get credentials from client ----
    const { email, password } = req.body;

    // ---- Validate admin credentials ----
    if (
        email !== process.env.ADMIN_EMAIL ||
        password !== process.env.ADMIN_PASSWORD
    ) throw new ApiError(401, "Invalid credentials");

    // ---- Generate JWT token ----
    const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "15m" });

    // ---- Send token in cookie and response to client ----
    return res
        .status(200)
        .cookie("token", token, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000
        })
        .json(new ApiResponse(200, {}, "Login successful"));
});

