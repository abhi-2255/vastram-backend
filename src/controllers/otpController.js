import { sendEmail } from "../utils/sendEmail.js"
import User from "../model/user.js"

const otpStore = {}

export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body
        console.log("OTP request received for :",email);
        
        if (!email) return res.status(400).json({ message: "Email required" })

        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        otpStore[email] = otp
        const expiry = new Date(Date.now() + 5*60*1000)
        const message = `Your OTP for email verification is: ${otp}. Will expire in 5 mins`

        const user = await User.findOneAndUpdate({email},{otp, otpExpiry:expiry},{upsert:true, new:true, setDefaultOnInsert:true})
        
        await sendEmail(email,"Vastram Email Verification OTP",message)
        console.log(`OTP sent to ${email}:${otp}`);
        res.json({success: true, message: "OTP sent successfully"})

        const token = jwt.sign({id:user._id, role: user.role}, process.env.JWT_SECRET,{expiresIn:'7d'})
        res.json({success:true, token, user:{id:user._id,email: user.email, name:user.name}})
        
    } catch (error) {
        console.error("Error sending otp", error);
        res.status(500).json({ messsage: "Failed to send otp" })
    }
}

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) return res.status(400).json({ message: "Email and OTP are required" })
        if (otpStore[email] && otpStore[email].toString() === otp.toString()) {
            delete otpStore[email]
            return res.status(200).json({ message: "OTP verified successfully" })
        } else {
            return res.status(400).json({ message: 'Invalid otp' })
        }
    } catch (error) {
        console.error("Error verfifying otp", error);
        res.status(500).json({message:"Internal Server Error"})
    }
}