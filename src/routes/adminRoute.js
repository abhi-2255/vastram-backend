import express from "express";
import { adminLogin } from "../controllers/adminController.js";
import { authMiddlware } from "../middlewares/authMiddleware.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = express.Router()

router.post('/login', adminLogin)
router.get("/dashboard", authMiddlware, isAdmin, )


export default router;