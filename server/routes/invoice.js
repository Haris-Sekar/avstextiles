import express from "express";
import { addInvoice } from "../controllers/invoice.js";
import {auth} from "../services/middleware/auth.js";
import {permission} from "../services/middleware/permission.js"

const router = express.Router();

router.post('/add',auth,permission,addInvoice);

export default router;