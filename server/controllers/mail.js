import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { verificationTemplate,frontEndBaseUrl } from "../consts/index.js";
import userModel from "../models/auth.js";
import jwt from "jsonwebtoken";
dotenv.config();
let transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAILUSER,
    pass: process.env.EMAILPASSWORD // naturally, replace both with your real credentials or an application-specific password
  }
});


export const accountVerification = async (email) => {
  try {
    const token = jwt.sign({
      email: email,
      dateCreated: Date.now()
    }, process.env.PRIVATEKEY);
    const user = await userModel.find({email : email});

    const props = {
      link : frontEndBaseUrl+"verify/"+token,
      name : user.name
    }
    const htmlContent = verificationTemplate(props)
    var mailOptions = {
      from: process.env.EMAILUSER,
      to: 'hariss.19cse@kongu.edu',
      subject: 'Confirm Your Email Address',
      html: htmlContent
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      }
      else {
        console.log(info);
        const response = {
          message: "Mail sent",
          code: 200
        }
        return response
      }
    })
  } catch (error) {
    const response = {
      message: error.message,
      code: 500
    }
    return response;
  }

}