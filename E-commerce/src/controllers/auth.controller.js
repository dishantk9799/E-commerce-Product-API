import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";

export const login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (
        email !== process.env.ADMIN_EMAIL ||
        password !== process.env.ADMIN_PASSWORD
    ) throw new ApiError(401, "Invalid credentials");


    const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "15m" });

    return res
        .status(200)
        .cookie("token", token, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000
        })
        .json(new ApiResponse(200, "Login successful"));
});

