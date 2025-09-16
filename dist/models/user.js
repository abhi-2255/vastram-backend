import mongoose, { Schema } from "mongoose";
var userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
}, { timestamps: true });
var User = mongoose.model("User", userSchema);
export default User;
//# sourceMappingURL=user.js.map