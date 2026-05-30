import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
    try {

        const { token } = req.cookies;

        if (!token) throw new ApiError(401, "Unauthorized request");

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        next();

    } catch (error) {
        next(new ApiError(401, "Invalid or expired token"));
    }
};

export default verifyJWT;