import mongoose from "mongoose";

const mainAreaSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: true,
    },
    userId : {
        type: String, 
        ref: 'user'
    },
    createdTime:{
        type:String,
        required: true,
        default: Date.now(),
    }
});


const mainAreaModel = mongoose.model("mainArea", mainAreaSchema);

export default mainAreaModel;