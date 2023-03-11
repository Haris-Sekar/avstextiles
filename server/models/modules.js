import mongoose from "mongoose";
const moduleSchema = new mongoose.Schema({ 
    moduleName:{
        type:String,
    },
    moduleId:{
        type:String,
    },
    userId:{
        type: String,
        ref: 'user'
    },
    dateCreated:{
        type:String,
        default:new Date().getTime()
    }
});


const modulesModel = mongoose.model("modules", moduleSchema);

export default modulesModel;