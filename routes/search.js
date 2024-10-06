import express from "express"
const router=express.Router()
import {handleSearch} from "../controllers/search.js"

router.route("/search").get(handleSearch)

export {router}