import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  productGroup: {
    type: String,
    ref: "productGroup",
    required: true,
  },
  price: {
    type: Object,
  }, 
  pcs:{
    type: String
  },
  userId:{
    type:String,
    ref: "user",    
  },
  addedTime:{
    type: String,
    required: true,
    default: Date.now(),
  }
});


const productModel = mongoose.model("product", productSchema);

export default productModel;
