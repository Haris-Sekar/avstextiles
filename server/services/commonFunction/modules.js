import {modules} from "../../const/permission.js";
import modulesModel from "../../models/modules.js";


export const addCommonModules = async (req,res) => {
    const modulesArray = Object.values(modules);
    const lastId = await modulesModel.find().sort({ _id: -1 }).limit(1);
    const shortName = process.env.SHORTNAME;
    let moduleId = shortName + 'M0'
    if(lastId.length > 0){
        moduleId = lastId[lastId.length - 1].moduleId;
    }
    let modulesObjectArray = []
    modulesArray.forEach((ele) => {
        let module = {moduleName : ele};
        modulesObjectArray.push(module);
    })
    const existingModules = await modulesModel.find({$or:modulesObjectArray});
    existingModules.forEach((ele) => {
        console.log(ele);
        delete modulesArray[modulesArray.indexOf(ele.moduleName)];
        console.log(modulesArray);
    });
    modulesArray.map((ele) => {
        let moduleId1 = moduleId.split(/([0-9]+)/);
        moduleId1 = parseInt(moduleId1[1]) + 1;
        moduleId1 = shortName + "M" + moduleId1;
        moduleId = moduleId1;
        const module = new modulesModel({moduleName:ele,moduleId:moduleId1});     
        module.save();
    })

}