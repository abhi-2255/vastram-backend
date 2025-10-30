import mongoose from "mongoose";
import { Schema } from "mongoose";

const categorySchema = new Schema({
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
    },
{timestamps: true })

const Category = mongoose.model("Category", categorySchema)
export default Category;