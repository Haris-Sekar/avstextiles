import { defaultPermissions } from "../const/permission.js";
import customerModel from "../models/customer.js"
import modulesModel from "../models/modules.js";

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

export const getAllModules = async (req,res) => {
    try {
        const result = await modulesModel.find({userId: req.id});
        res.status(200).json({
            code: 200,
            message: "modules fetched successfully",
            result: result
        })
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: error.message,
        })
    }
}