import dotenv from "dotenv"
//require('dotenv').config({path:"./.env"})

import mongoose from "mongoose";
import { DB_NAME } from "./constant.js";
import connectDB from "./database/index.js";

dotenv.config({
    path:'/.env',
})

connectDB();

connectDB.insertOne({ a: 1 });














/*
import { Express } from "express";
const app = express()

// a direct func to connect db
;( async () =>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error) => {
            console.log("Error: ",error);
            throw error;
        })
        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.error("Error : ",error)
        throw error 
    }
})()
*/