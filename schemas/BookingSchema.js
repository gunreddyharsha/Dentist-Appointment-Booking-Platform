const { Schema, default: mongoose } = require("mongoose");

const BookingSchema = new Schema({
  patientName: String,
  age: Number,
  gender: String,
  appointmentDate: Date,
  patientId: { type: mongoose.Schema.Types.ObjectId },
  dentistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "dentistData",
  },
});
const BookingModel = mongoose.model("BookingData", BookingSchema);
module.exports = { BookingModel };
