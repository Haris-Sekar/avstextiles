import express from "express";
import {
  add,
  addMainArea,
  deleteCustomer,
  getCustomer,
  getAllMainArea,
  bulkUpdate,
  updateMainArea,
  deleteMainArea
} from "../controllers/customer.js";

import { auth } from "../services/middleware/auth.js";
import { permission } from "../services/middleware/permission.js";

const router = express.Router();

router.post("/add", auth, permission, add);

router.get("/", auth, permission, getCustomer);

router.put("/update", auth, permission, bulkUpdate);

router.delete("/delete", auth, permission, deleteCustomer);

router.get("/mainArea", auth, permission, getAllMainArea);

router.post("/mainArea/add", auth, permission, addMainArea);

router.put("/mainArea/update", auth, permission, updateMainArea);

router.delete("/mainArea/delete", auth, permission, deleteMainArea)

export default router;
