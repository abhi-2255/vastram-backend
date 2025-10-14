import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const link = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB is connnected on ${link.connection.host}`);
    } catch (error) {
        console.error("Error in MongoDB connection", error)
        process.exit(1)
    }
}

export default connectDB;