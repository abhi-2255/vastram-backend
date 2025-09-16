import express, { type Application } from "express"
import cors from "cors"
import mongoose from "mongoose"
import authRoutes from "./routes/auth.js"



const app: Application = express()
const PORT = process.env.port || 5000

app.use(cors())
app.use(express.json())


mongoose.connect("mongodb://localhost:27017/vastram")
    .then(()=>console.log("MongoDB connnected"))
    .catch(error => console.error(error))


app.use("/routes/auth.js", authRoutes)




app.listen(PORT, ()=> console.log("Server is running"))