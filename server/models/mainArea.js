import mongoose from "mongoose";

const mainAreaSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: true,
    },
    createdTime:{
        type:Date,
        required: true,
        default: Date.now(),
    }
});


const mainAreaModel = mongoose.model("mainArea", mainAreaSchema);

export default mainAreaModel;