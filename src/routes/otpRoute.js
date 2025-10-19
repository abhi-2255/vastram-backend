import express from "express"
import { sendOtp, verifyOtp } from "../controllers/otpController.js"

const router = express.Router()

router.post('/auth/send-otp', sendOtp)
router.post('/auth/verifyotp', verifyOtp)

export default router;