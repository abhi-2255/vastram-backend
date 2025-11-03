import dotenv from "dotenv"
import connectDB from "./src/config/db.js"
import express from "express"
import cors from "cors"
import userRoute from "./src/routes/userRoute.js"
import otpRoute from "./src/routes/otpRoute.js"
import adminRoute from "./src/routes/adminRoute.js"
import seedAdmin from "./src/config/seedAdmin.js"



dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/auth",userRoute)
app.use("/auth",otpRoute)
app.use("/admin",adminRoute)


const PORT = process.env.PORT || 5000

connectDB().then(()=>{
    seedAdmin()
    app.listen(PORT,()=>console.log(`Server running on ${PORT}`))
}).catch(err =>{
    console.error("DB Connection Failed", err);
})
