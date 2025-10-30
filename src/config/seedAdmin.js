import bcrypt from "bcryptjs";
import User from "../model/user.js";

const seedAdmin = async () => {
    try {
        const existingAdmin = await User.findOne({ role: "admin" });
        if (existingAdmin) {
            console.log("✅ Admin user already exists");
            return;
        }

        const hashedPassword = await bcrypt.hash("admin123", 10);
        const admin = new User({
            name: "Admin",
            email: "admin@example.com",
            password: hashedPassword,
            role: "admin"
        });

        await admin.save();
        console.log(" Default admin created: email=admin@example.com | password=admin123");
    } catch (err) {
        console.error("Error creating admin:", err.message);
    }
};

export default seedAdmin;
