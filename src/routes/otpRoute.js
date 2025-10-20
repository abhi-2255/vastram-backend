import express from "express"
import { sendOtp, verifyOtp } from "../controllers/otpController.js"

const router = express.Router()

router.post('/send-otp', sendOtp)
router.post('/verifyotp', verifyOtp)

export default router;