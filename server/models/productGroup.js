import mongoose from "mongoose";

const productGroupSchema = new mongoose.Schema({
  groupId: {
    type: String,
    required: true,
  },
  groupName: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    ref: "user",
  },
  addedTime: {
    type: String,
    required: true,
    default: Date.now(),
  },
});

const productGroupModel = mongoose.model("productGroup", productGroupSchema);

export default productGroupModel;
