import fs from "fs";
import {v2 as cloudinary} from 'cloudinary';
          
const connectCloud = () => cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key:process.env.CLOUDINARY_API_KEY , 
  api_secret:process.env.CLOUDINARY_API_SECRET 
});
connectCloud();

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath){
            return null;
        }
        const response = cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        //file uploaded successfully
        
        console.log('File uploaded successfully', (await response).url);
        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove locally saved temp file as upload failed
    }
}

export {uploadOnCloudinary} ;