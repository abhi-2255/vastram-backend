import nodemailer from "nodemailer"

const otpStore = {}

export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body
        if (!email) return res.status(400).json({ message: "Email required" })

        const otp = Math.floor((100000 + Math.random() * 900000))
        otpStore[email] = otp

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.USER_PASS,
            },
        })
        const mailOptions = {
            from: `"Vastram: <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Vastram Email Verification OTP",
            text: `Your OTP for email verification is: ${otp}`
        }
        await transporter.sendMail(mailOptions)
        console.log(`OTP send to ${email}`);
        res.status(200).json({ message: 'OTP sent successfully' })

    } catch (error) {
        console.error("Error sending in otp", error);
        res.status(500).json({ messsage: "Failed to send otp" })
    }
}

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || otp) return res.status(400).json({ message: "Email and OTP are required" })
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