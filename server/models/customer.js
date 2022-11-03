import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    cusId:{
        type:String,
        required:true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    phone: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    gstNum: {
        type: String,
    },
    mainArea: {
        type: String
    },
    createdTime:{
        type:Date,
        required: true,
        default: Date.now(),
    }
});


const customerModel = mongoose.model("customer", customerSchema);

export default customerModel;