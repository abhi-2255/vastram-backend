import User from "../model/user.js";
import jwt from "jsonwebtoken"

const authMiddlware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Not authorized & no token provided" })
        }
        const token = authHeader.split(" ")[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(payload.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        req.user = user
        next();
    } catch (error) {
        console.error("Token verification Error", error)
        return res.status(401).json({ message: "Not authorized, invalid or expired token" });
    }
}


export { authMiddlware }
