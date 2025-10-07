import dotenv from "dotenv"
import connectDB from "./src/config/db.js"
import express from "express"
import cors from "cors"
import userRoute from "./src/routes/userRoute.js"

dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/auth",userRoute)


const PORT = process.env.PORT || 5000
app.listen(PORT,()=>console.log(`Server running on ${PORT}`)
)