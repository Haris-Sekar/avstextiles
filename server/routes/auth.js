import express from "express";


import { login, signup,accountVerify,accountSendMail } from "../controllers/auth.js";


const router = express.Router();


router.post("/signup",signup);
router.post("/login",login)
router.post("/verify",accountVerify);
router.get("/accountSendMail",accountSendMail);

export default router;