import express from "express";
import { adminLogin } from "../controllers/adminController.js";
import { authMiddlware } from "../middlewares/authMiddleware.js";
import isAdmin from "../middlewares/isAdmin.js";
import { blockUser, getAllUsers, unblockUser } from "../controllers/adminUserController.js";

const router = express.Router()

router.post('/login', adminLogin)

router.get("/dashboard", authMiddlware, isAdmin)
router.get("/users", authMiddlware, isAdmin, getAllUsers)
router.patch("/user/:id/block",authMiddlware,isAdmin,blockUser)
router.patch("/user/:id/unblock",authMiddlware,isAdmin,unblockUser)


export default router;