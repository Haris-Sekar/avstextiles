import express from "express";
import { getAllDefaultPermission } from "../controllers/permission.js";
import {auth} from "../services/middleware/auth.js";
import { permission } from "../services/middleware/permission.js";
 


const router = express.Router();


router.get("/getAllPermission",getAllDefaultPermission); 

router.put("/editPermission",auth,permission);

export default router;