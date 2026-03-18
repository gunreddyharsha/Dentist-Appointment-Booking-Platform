const express=require("express") 
const { authUser } = require("../middleware/auth")
const { dentistModel } = require("../schemas/dentistSchema")
const dentistRoute=express.Router()
dentistRoute.get("/dentists",authUser,async (req ,res)=>{
    try{
        const dentists=await dentistModel.find() 
        res.json({
            data:dentists
        })
    }catch(err){
        res.status(401).json({
            Message:err.Message
        })
    }
})
dentistRoute.post("/addDentist", async (req, res) => {
  try {
    const { name, photo, Qualification, Experience, Clinic_Name, Address } =
      req.body;
    const addData = new dentistModel({
      name,
      photo,
      Qualification,
      Experience,
      Clinic_Name,
      Address,
    });
    await addData.save();
    res.status(200).json({
      message: "dentistAdded Successfully",
    });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});
module.exports={dentistRoute}