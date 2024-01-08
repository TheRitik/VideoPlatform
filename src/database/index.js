import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
const connectDB = async() => {
    try {
        console.log(process.env.MONGODB_URI)
        const connectionInstance = await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDb Connected !! DB HOST : ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MONGOGB Failed to connect : " , error);
        process.exit(1);
    }
}
export default connectDB
