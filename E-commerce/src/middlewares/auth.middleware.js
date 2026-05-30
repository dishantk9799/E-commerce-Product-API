import jwt from "jsonwebtoken";
import ApiError from "../utils/apiError.js";

// ---- Verify JWT token ----
const verifyJWT = (req, res, next) => {
    try {

        // ---- Get token from cookies ----
        const { token } = req.cookies;

        // ---- Check if token exists ----
        if (!token) throw new ApiError(401, "Unauthorized request");

        // ---- Verify token using JWT secret ----
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // ---- Pass control to next middleware/controller ----
        next();

    } catch (error) {
        // ---- Handle invalid or expired token ----
        next(new ApiError(401, "Invalid or expired token"));
    }
};

export default verifyJWT;