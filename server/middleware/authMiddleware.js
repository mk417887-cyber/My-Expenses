import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const protect = (req, res, next) => {

    const authHeader = req.headers.authorization// the token is in the headers of the request // it contains req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json
            ({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];// authHeader me se token nikalna hai as it also contains bearer

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded; // this will be available in the req object // it will contain { id : decoded.id , name , email }

        next();//"Authentication is successful. Continue to the next middleware/controller."
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }

}