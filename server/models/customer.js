import mongoose from "mongoose";
const customerSchema = new mongoose.Schema({
  cusId: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  address1: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
  },
  state: {
    type: String,
  },
  city: { type: String },
  pincode: { type: String },
  gstNum: {
    type: String,
  },
  mainArea: {
    type: String,
    ref: "mainArea",
  },
  balance: {
    type: String,
    default: 0,
  },
  permissions: {
    type: Object,
    required: true,
  },
  userId: {
    type: String,
    ref: "user",
  },
  createdTime: {
    type: String,
    required: true,
    default: new Date().getTime(),
  },
});

const customerModel = mongoose.model("customer", customerSchema);

export default customerModel;
