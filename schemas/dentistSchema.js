const { Schema, default: mongoose } = require("mongoose");

const dentistSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    Qualification: {
      type: String,
    },
    Experience: {
      type: String,
    },
    Clinic_Name: {
      type: String,
    },
    Address: {
      type: String,
    },
  },{
  timestamps:true,}
); 
const dentistModel=mongoose.model("dentistData",dentistSchema)
module.exports={dentistModel}