import { Router } from "express";
import { registerUser } from "../controller/user.controller.js";
import {upload} from "../middleware/multer.middleware.js";
import multer from "multer";

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount: 1,
        },
        {
            name: "coverImage",
            maxCount:3
        },
    ]),
    registerUser
    )

export default router