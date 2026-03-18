const validator = require("validator");

const validataSignupData = (data,res) => {
  const { email, password, firstName, lastName, role } = data;
  if (!validator.isEmail(email)) {
    return res.status(401).json({
      message: "email not valid",
    });
  } else if (!validator.isStrongPassword(password)) {
    return res.status(401).json({
      message: "Enter strong Passwword",
    });
  } else if (!firstName || !lastName || !email || !password) {
    return res.status(401).json({
      messsage: "requires all fields",
    });
  }
};
module.exports = { validataSignupData };
