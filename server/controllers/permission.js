import { defaultPermissions } from "../const/permission.js";
import customerModel from "../models/customer.js"

export const getAllDefaultPermission = async (req,res) => {
    try {
        const defaultPermission = defaultPermissions;
        const result = {
            code: 200,
            defaultPermissions: defaultPermission
        }
        res.send(result);
    } catch (error) {
        const result = {
            code: 500,
            message: "Something went wrong"
        }
        res.send(result)
    }
}

export const editPermission = async (req,res) => {
    try {
        const result = await customerModel.findOneAndUpdate({userId: req.id,_id:req.body.id},req.body);
        res.status(200).json({

        })
    } catch (error) {
        
    }
}