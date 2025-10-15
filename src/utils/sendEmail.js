import nodemailer from "nodemailer";

export const sendEmail = async (email,subject,message)=>{
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        })
        await transporter.sendMail({
            from: `"Vastram" <${process.env.EMAIL_USER}>`,
            to: email, subject,
            text: message,
        })
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email", error);
        throw new Error("Email not sent")
    }
}