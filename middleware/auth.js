const jwtToken = require("jsonwebtoken");
const { userModel } = require("../schemas/userSchema");
const authUser = async (req, res, next) => {
  try {
    const { token } = req.cookies; 
    if(!token){
        return res.json({
            message:"please Login"
        })
    } 
      const isTokenValid = await jwtToken.verify(token, "Dentists");
      const { _id } = isTokenValid;
      const user = await userModel.findById(_id);

      if (!user) {
        return res.status(401).json({
          message: "User not found",
        });
      }
      req.user = user;
      next();
  } catch (err) {
     res.status(401).json({
       message: err.message,
     });
  }
};
module.exports={authUser}