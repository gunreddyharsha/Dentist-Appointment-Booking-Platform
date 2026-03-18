const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type:String ,
    enum:["admin","user"],
    default:"user"
  }
}); 
const userModel=new mongoose.model("user",userSchema)
module.exports={userModel}