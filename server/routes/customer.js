import express from "express";
import {
  add,
  addMainArea,
  deleteCustomer,
  getAll,
  getAllMainArea,
  update,
} from "../controllers/customer.js";

const router = express.Router();

router.post("/add", add);

router.get("/", getAll);

router.put("/update", update);

router.delete("/delete/:id", deleteCustomer);

router.get("/mainArea", getAllMainArea);

router.post("/addMainArea", addMainArea);

export default router;
