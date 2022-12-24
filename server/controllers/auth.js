import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/auth.js";
import { accountVerification } from "./mail.js";
import {defaultPermissions,USERTYPE} from "../consts/permission.js"


export const login = async (req, res) => {
    const { email } = req.body;
    (req.body);
    try {
        const result = await userModel.findOne({ email: email });
        if (!result) {
            const response = {
                message: "Invalid Credentials",
                code: 500
            }
            res.send(response);
            return;
        }

        else {
            const resultOfSalt = await bcrypt.compare(req.body.password, result.password);
            (resultOfSalt);
            if (!resultOfSalt) {
                const response = {
                    message: "Invalid Credentials",
                    code: 500
                }
                res.send(response);
                return;
            }
            else {
                const token = result.generateToken();
                res.cookie("jwt_token", token, { maxAge: 604800000 });
                if (!result.isVerified) {
                    const response = {
                        message: "User not verified",
                        status: 200
                    }
                    res.send(response);
                    return
                }
                else {
                    const response = {
                        message: "login success",
                        code: 200,
                        jwt_token: token
                    }
                    res.send(response);
                    return;
                }
            }
        }

    } catch (error) {
        const response = {
            message: error.message,
            code: 500
        }
        res.send(response);
        return;
    }


}

export const signup = async (req, res) => {
    const { name, email, password, mobile, confirmPassword, userType } = req.body;
    const permission = defaultPermissions[userType];
    const newUser = new userModel({
        name,
        email,
        password,
        mobile,
        userType: USERTYPE[userType],
        permission:permission,
        isVerified: false,
    });

    if (password.localeCompare(confirmPassword)) {
        const response = {
            message: "Password doesn't match",
            code: 422
        }
        res.send(response);
    } else {
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        (req.body.email);
        const alreadyAUserWithEmail = await userModel.findOne({ email: req.body.email });
        const alreadyAUserWithPhone = await userModel.findOne({ mobile: req.body.mobile });
        if (alreadyAUserWithEmail && alreadyAUserWithPhone) {
            const response = {
                message: "User already exits with the same Email and Phone",
                code: 409
            }
            res.send(response);
        }
        else if (alreadyAUserWithPhone) {
            const response = {
                message: "User already exits with the same Phone",
                code: 409
            }
            res.send(response);
        }
        else if (alreadyAUserWithPhone) {
            const response = {
                message: "User already exits with the same Email",
                code: 409
            }
            res.send(response);
        }
        else {
            try {
                const result = await newUser.save();
                const accVerification = accountVerification(email);
                if (!accVerification) {
                    const response = {
                        message: "error",
                        code: 500
                    }
                    res.send(response);
                    return;
                }
                else {
                    const response = {
                        message: "User created!",
                        status: 200,
                    }
                    res.send(response);
                    return
                }

            } catch (error) {
                const response = {
                    message: error.message,
                    code: 500
                }
                res.send(response);
                return;
            }
        }

    }


}

export const accountVerify = async (req, res) => {
    try {
        const tokenData =await jwt.decode(req.body.token);
        (tokenData);
        const result = await userModel.findOne({ email: tokenData.email });
        (result);
        if (result.isVerified) {
            const response = {
                message: "user already verified",
                status: 200
            }
            res.send(response);
            return;
        }
        if (tokenData.dateCreated <= Date.now()) {
            const result = await userModel.updateOne({ email: tokenData.email},{isVerified: true });
            (result);
            const response = {
                message: "user verified",
                code: 200
            }
            res.send(response);
            return;
        }
    } catch (error) {
        const response = {
            message: error.message,
            code: 500
        }
        res.send(response);
        return;
    }
}

export const accountSendMail = async (req, res) => {
    try {
        const token = req.cookies.jwt_token
        const tokenData = jwt.decode(token);
        const result = await userModel.findOne({ email: tokenData.email });
         if (result.isVerified) {
            const response = {
                message: "user already verified",
                status: 200
            }
            res.send(response);
            return;
        }
        else {
            const sendMail = accountVerification(result.email);
            (sendMail);
            const response = {
                message: "Mail sent",
                status: "200"
            }
            res.send(response);
            return;
        }
    } catch (error) {
        const response = {
            message: error.message,
            code: 500
        }
        res.send(response);
        return;
    }

}   
