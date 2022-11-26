import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";

import auth from "./routes/auth.js";
import home from "./routes/home.js";
import customer from "./routes/customer.js";
import permission from "./routes/permission.js";

 const app = express();


app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().array());
dotenv.config();


app.use("/auth",auth); 
app.use("/",home)
app.use('/customer',customer);
app.use("/permission",permission);

const port = process.env.PORT;
mongoose
  .connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(port, () => console.log(`Serve running on port ${port}`))
  )
  .catch((error) => console.log(error));