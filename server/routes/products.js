import express from "express";

import { auth } from "../services/middleware/auth.js";
import { permission } from "../services/middleware/permission.js";
import {
  getAll,
  add,
  update,
  deleteProduct,
  addProductGroup,
  addSize,
  getAllProductGroup,
  getAllSize,
  updateProductGroup,
  updateSize,
  deleteSize,
  deleteProductGroup,
} from "../controllers/products.js";

const router = express.Router();

router.get("/", auth, permission, getAll);

router.post("/add", auth, permission, add);

router.put("/update", auth, permission, update);

router.delete("/delete/:id", auth, permission, deleteProduct);

router.post("/productGroup/add", auth, permission, addProductGroup);

router.get("/productGroup", auth, permission, getAllProductGroup);

router.put("/productGroup/update", auth, permission, updateProductGroup);

router.delete("/productGroup/delete", auth, permission, deleteProductGroup);

router.get("/size", auth, permission, getAllSize);

router.post("/size/add", auth, permission, addSize);

router.put("/size/update", auth, permission, updateSize);

router.delete("/size/delete", auth, permission, deleteSize);


export default router;
