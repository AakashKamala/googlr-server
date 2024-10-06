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

app.listen(8003,()=>{
    console.log("server is running on port 8003");
})