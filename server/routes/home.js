import express from "express";
import { serverHome } from "../controllers/home.js";
const router = express.Router();

router.get('/',serverHome);

export default router;