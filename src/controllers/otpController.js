import User from "../model/user.js"
import { sendEmail } from "../utils/sendEmail.js"
import Otp from "../model/otpModel.js"
import bcrypt from "bcrypt"



export const sendOtp = async (req, res) => {
    try {
        const { firstName, lastName, mobile, email, password } = req.body
        console.log("OTP request received for :", email);

        if (!email) return res.status(400).json({ message: "Email required" })

        const existingUser = await User.findOne({ email })
        if (existingUser)
            return res.status(400).json({ message: "User already exists, Please Login" })

        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        await Otp.deleteMany({ email })

        await Otp.create({
            email,
            otp,
            userData: { firstName, lastName, mobile, password }
        })

        const message = `Your OTP is ${otp}, Valid for 5 min`
        await sendEmail(email, "Vastram Email Verification OTP", message)
        console.log(`otp sent to ${email}:${otp}`);
        return res.status(200).json({ success: true, message: "OTP Sent Successfully" })

        // const token = jwt.sign({ id: User._id, role: User.role }, process.env.JWT_SECRET, { expiresIn: '7d' })
        // return res.json({ success: true, token, user: { id: User._id, email: User.email, name: User.name }, })

    } catch (error) {
        console.error("Error sending otp", error);
        return res.status(500).json({ message: "Failed to send otp" })
    }
}

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        console.log("Verify request:",email,otp);
        
        if (!email || !otp)
            return res.status(400).json({ message: "Email and OTP are required" })

        const record = await Otp.findOne({ email });
        if (!record) return res.status(400).json({ message: "OTP not found or expired" });
        console.log("Otp record found:", record);
        
        if (record.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });
        console.log("OTP matching processing");
        
        const { firstName, lastName, mobile, password } = record.userData;
        console.log("User data extracted", record.userData);
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            firstName,
            lastName,
            mobile,
            email,
            password: hashedPassword,
        })

        await Otp.deleteOne({ email })
            console.log("User created successfully",user.email);
            
        return res.status(201).json({
            success: true,
            message: "User created successfulyy after OTP verification",
            user: { id: user._id, email: user.email },
        })
    } catch (error) {
        console.error("Error verifiying in otp", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}