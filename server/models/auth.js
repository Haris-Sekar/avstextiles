import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
  permission:{
    type:Object,
    required:true
  },
  isVerified: {
    type: Boolean,
    required: true,
  },
});

userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      id: this._id,
      email: this.email,
      name: this.name,
      userType: this.userType,
      isVerified: this.isVerified,
    },
    process.env.PRIVATEKEY
  );
  return token;
};

const userModel = mongoose.model("user", userSchema);

export default userModel;
