import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
    invoiceId:{
        type:String,
        required: true
    },
    customerId: {
        type: String,
        required: true,
        ref:'customer'
    },
    invoiceRow:{
        type: Array,
        required: true,
    },
    invoiceDiscount:{
        type: Number,
        default: 0
    },
    invoiceNetRate:{
        type: Number,
        default: 0,
        required: true
    },
    userId:{
        type: String,
        ref:"user",
        required: true
    }
});


const invoiceModel = mongoose.model("invoice", invoiceSchema);

export default invoiceModel;
