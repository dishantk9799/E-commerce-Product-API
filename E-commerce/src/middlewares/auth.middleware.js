import jwt from "jsonwebtoken";
import ApiError from "../utils/apiError.js";

const verifyJWT = (req, res, next) => {

    try {

        // ---- Get token from headers ----
        const { token: authorization } = req.headers;

        // ---- Check token exists or not ----
        if (!token) throw new ApiError(401, "Token not found");


        // ---- Verify token ----
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET);

        // ---- Store user data in req.user ----
        req.user = decodedToken;

        // ---- Go to next middleware/controller ----
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });

    }

};

export default verifyJWT;