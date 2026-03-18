const express = require("express");
const { userModel } = require("../schemas/userSchema");
const { dentistModel } = require("../schemas/dentistSchema");
const { BookingModel } = require("../schemas/BookingSchema");
const { authUser } = require("../middleware/auth");
const appointmentRouter = express.Router();

appointmentRouter.post(
  "/booking/:name/:age/:gender/:Date/:dentistId/:patientId",
  authUser,
  async (req, res) => {
    try {
      const { name, age, gender, Date, dentistId, patientId } = req.params;
      const validPatientID = await userModel.findById(patientId);
      const validDentistId = await dentistModel.findById(dentistId);
      if (!validPatientID) {
        return res.json({
          message: "patient is not present",
        });
      }
      if (!validDentistId) {
        return res.json({
          message: "Dentist is not present",
        });
      }
      const isUserBookedAlready = await BookingModel.findOne({
        patientId,
        appointmentDate: Date,
        dentistId,
      });
      if (isUserBookedAlready) {
        return res.json({
          message: "Appoitment Already Scheduled",
        });
      }
      const newBooking = new BookingModel({
        patientName: name,
        age,
        gender,
        appointmentDate: Date,
        dentistId,
        patientId,
      });
      const saveData = await newBooking.save();
      res.json({
        message: "appoitment booked successfully",
        data: saveData,
      });
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  },
);
appointmentRouter.get("/allAppoitments", authUser, async (req, res) => {
  try {
    const loginUser=req.body 
    
    const data = await BookingModel.find().populate(
      "dentistId",
      "name Clinic_Name",
    );
    res.json({
      data: data,
    });
  } catch (err) {
    res.send(err.message);
  }
});
appointmentRouter.get("/userAppoitments", authUser, async (req, res) => {
  try {
    const loginUser = req.user;
    const userBookings = await BookingModel.find({
      patientId: loginUser._id,
    }).populate("dentistId","name Clinic_Name");
    res.json({
      data: userBookings,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
});
module.exports = { appointmentRouter };
