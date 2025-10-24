import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();

const test = async () => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const info = await transporter.sendMail({
        from: `"Vastram" <${process.env.EMAIL_USER}>`,
        to: "your_personal_email@gmail.com",
        subject: "Testing Nodemailer",
        text: "If you see this, nodemailer works!",
    });

    console.log("✅ Test Email sent:", info.response);
};

test().catch(console.error);
