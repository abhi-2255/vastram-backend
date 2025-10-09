import express from "express"
import { createUser } from "../controllers/userController.js"
import { loginUser } from "../controllers/userController.js"
import { authMiddlware } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.post("/signup",createUser)
router.post("/login",loginUser)

router.get("/profile",authMiddlware, loginUser)

export default router