import { response } from "express";
import {asyncHandler} from "../utils/asyncHandler.js" ;

const registerUser = asyncHandler( async (req,res) =>{
    res.status(200).json({
        message: "Ritik is here"
    })
})
export {registerUser}