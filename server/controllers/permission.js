import { defaultPermissions } from "../consts/permission.js";


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