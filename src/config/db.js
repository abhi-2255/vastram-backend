import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB is connnected on ${connect.connection.host}`);
    } catch (error) {
        console.error("Error in MongoDB connection", error)
        process.exit(1)
    }
}

export default connectDB;