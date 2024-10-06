import express from "express"
const app=express()
import cors from "cors"
import {router as search} from "./routes/search.js"
import dotenv from "dotenv"
dotenv.config()

app.use(cors())
app.use(express.json())

app.use("/", search)

app.get("/",(req,res)=>{
    res.send("ALive")
})

app.get("/alive",(req,res)=>{
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    return res.json(`${hours}:${minutes}:${seconds}`);
})

app.listen(process.env.PORT,()=>{
    console.log("server is running on port 8003");
})