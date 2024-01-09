import { response } from "express";
import {asyncHandler} from "../utils/asyncHandler.js" ;
import {apiError} from "../utils/apiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { apiResponse } from "../utils/apiResponse.js";
import  Jwt  from "jsonwebtoken";
import mongoose from "mongoose";


const registerUser = asyncHandler( async (req,res) =>{
    // get user details from frontend ( postman )
    // validation - empty , format 
    // check user exists or not
    // check for images , check for avatar
    // upload them to cloudinary, avatar 
    // create user object -  create entry in db
    // remove password , refreshtoken field from response 
    // check for user creation 
    // return res

    /* Comming data from frontend get via req.body*/
    const {fullname, email, username, password} =  req.body
    console.log("email : ",email);
    /* check one by one 
    if(fullname === ""){
        throw new apiError (400,"full name is required")
    }*/

    // or we can check all together
    if(
        [ username,fullname , email , password].some((field) => field?.trim() === "")
    ){
        throw new apiError(400,"all filed are required")
    }

    const exitedUser = await User.findOne({
        $or: [{username} ,{email}]
    })
    if(exitedUser){
        throw new apiError(409 , "username or email already exist ");
    }
    const avatarLocalPath = req.files?.avatar[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;
    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }
    
    if(!avatarLocalPath){
        throw new apiError(400,"Avatar is not found")
    }
    console.log(avatarLocalPath)
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new apiError (400,"Avatar is not found 2") 
    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),
    })

    const createdUser  = await User.findById(user._id).select("-password -refreshToken ")
    if(!createdUser){
        throw new apiError(500,"something went worng while registering a user")
    }

    return res.status(201).json(
        new apiResponse(200,createdUser,"User registered successfully")
    )

})
export {registerUser}