import mongoose from "mongoose";

const productSizeSchema = new mongoose.Schema({
  sizeId: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    ref: "productSize",
    required: true,
  },
  userId:{
    type:String,
    ref: "user",    
  },
  addedTime:{
    type: String,
    required: true,
    default: new Date().getTime(),
  }
});


const productSizeModel = mongoose.model("productSize", productSizeSchema);

export default productSizeModel;
