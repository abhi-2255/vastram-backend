import express, {} from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
var app = express();
var PORT = process.env.port || 5000;
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/vastram")
    .then(function () { return console.log("MongoDB connnected"); })
    .catch(function (error) { return console.error(error); });
app.use("/routes/auth.js", authRoutes);
app.listen(PORT, function () { return console.log("Server is running"); });
//# sourceMappingURL=server.js.map