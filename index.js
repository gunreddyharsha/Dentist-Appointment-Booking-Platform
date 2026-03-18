const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
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
const db_password=process.env.DB_PASSWORD
const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://Harsha:" +
      db_password +
      "@cluster0.2hwwh7w.mongodb.net/Dentist_appointment_booking",
  );
};
app.use("/",appRouter)
app.use("/", appointmentRouter);
app.use("/", dentistRoute);
const port=process.env.PORT || 6666
connectDb()
  .then(() => {
    console.log("dataBase Connected Successfully");
    app.listen(port, () =>
      console.log("serconnectedConnected Succssfully " + port),
    );
  })
  .catch(() => {
    console.log("server not connected");
  });
