import User from "../model/user.js"
import { sendEmail } from "../utils/sendEmail.js"
import jwt from "jsonwebtoken"

const otpStore = {}

export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body
        console.log("OTP request received for :", email);

        if (!email) return res.status(400).json({ message: "Email required" })

        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        otpStore[email] = { otp, expiry: Date.now() + 5 * 60 * 1000 }

        const message = `Your OTP is ${otp}, Valid for 5 min`
        await sendEmail(email, "Vastram Email Verification OTP",message)
        console.log(`otp sent to ${email}:${otp}`);

        const token = jwt.sign({ id: User._id, role: User.role }, process.env.JWT_SECRET, { expiresIn: '7d' })
        return res.json({ success: true, token, user: { id: User._id, email: User.email, name: User.name }, })

    } catch (error) {
        console.error("Error sending otp", error);
        return res.status(500).json({ messsage: "Failed to send otp" })
    }
}

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp, name, password } = req.body;
        if (!email || !otp)
            return res.status(400).json({ message: "Email and OTP are required" })

        const stored = otpStore[email]
        if (!stored)
            return res.status(400).json({ message: "OTP not found" })

        if (stored.otp !== otp)
            return res.status(400).json({ message: "Invalid OTP" })
        if (Date.now() > stored.expiry)
            return res.status(400).json({ message: "OTP expired" })

        const user = await User.create({ email, name, password })
        delete otpStore[email]

        return res.json({
            success: true,
            message: "User created successfulyy after OTP verification",
            user: { id: user._id, email: user.email },
        })
    } catch (error) {
        console.error("Error verifiying in otp", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}