import express from "express";
import { getAllDefaultPermission,getAllModules } from "../controllers/permission.js";
import {auth} from "../services/middleware/auth.js";
import { permission } from "../services/middleware/permission.js";
 


const router = express.Router();


router.get("/getAllPermission",getAllDefaultPermission); 

router.put("/editPermission",auth,permission);

router.get('/modules',auth,permission,getAllModules)
export default router;