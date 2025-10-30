import mongoose from "mongoose";
import { Schema } from "mongoose";

const productSchema = new Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String },
    color: { type: String },
    size: { type: String },
    stock: { type: Number, default: 0 },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    images: [
        {
            original: String,   // URL path to original/resized
            thumb: String      // smaller thumbnail
        }
    ],
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
},
{timestamps: true})

const Product = mongoose.model("Product", productSchema)
export default Product