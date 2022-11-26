import express from "express";
import { getAllDefaultPermission } from "../controllers/permission.js";

 


const router = express.Router();


router.get("/getAllPermission",getAllDefaultPermission); 

export default router;