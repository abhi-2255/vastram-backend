import dotenv from "dotenv"
import connectDB from "./src/config/db.js"
import express from "express"
import cors from "cors"
import userRoute from "./src/routes/userRoute.js"
import otpRoute from "./src/routes/otpRoute.js"

dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/auth",userRoute)
app.use("/auth",otpRoute)


const PORT = process.env.PORT || 5000
app.listen(PORT,()=>console.log(`Server running on ${PORT}`)
)