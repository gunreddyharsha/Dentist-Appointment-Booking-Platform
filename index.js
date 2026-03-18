const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
var cookieParser = require('cookie-parser')

const { appRouter } = require("./routes/userRoutes");
const { appointmentRouter } = require("./routes/AppointmentRoute");
const { dentistRoute } = require("./routes/dentistRoute");
const { DB_PASSWORD } = require("./utilis/constants");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://Harsha:"+DB_PASSWORD+"@cluster0.2hwwh7w.mongodb.net/Dentist_appointment_booking",
  );
};
app.use("/",appRouter)
app.use("/", appointmentRouter);
app.use("/", dentistRoute);

connectDb()
  .then(() => {
    console.log("dataBase Connected Successfully");
    app.listen(7777, () => console.log("serconnectedConnected Succssfully"));
  })
  .catch(() => {
    console.log("server not connected");
  });
