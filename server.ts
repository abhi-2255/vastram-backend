import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import authRoutes from "./routes/auth"


const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/vastram")
    .then(()=>console.log("MongoDB connnected"))
    .catch(error => console.error(error))


app.use("/routes/auth.js", authRoutes)




app.listen(5000, ()=> console.log("Server is running"))