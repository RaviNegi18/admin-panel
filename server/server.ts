import express from "express"
import userRoutes from "./../server/routes/auth.routes.js"
import connectDB from "./config/DB.ts";
import cors from "cors"
const PORT=5000;
const app=express()
connectDB()

app.use(cors())
app.use(express.json())
app.use("/api/auth",userRoutes)

app.listen(PORT,()=>{
    console.log(`your app is listening on http://localhost:${PORT}`)
})



