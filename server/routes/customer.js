import express from "express";
import {
  add,
  addMainArea,
  deleteCustomer,
  getAll,
  getAllMainArea,
  update,
} from "../controllers/customer.js";

import { auth } from "../services/middleware/auth.js";
import { permission } from "../services/middleware/permission.js";

const router = express.Router();

router.post("/add", auth, permission, add);

router.get("/", auth, permission, getAll);

router.put("/update", auth, permission, update);

router.delete("/delete/:id", auth, permission, deleteCustomer);

router.get("/mainArea", auth, permission, getAllMainArea);

router.post("/addMainArea", auth, permission, addMainArea);

export default router;
