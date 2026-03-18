const { Schema, default: mongoose } = require("mongoose");

const dentistSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default:
        "https://tse2.mm.bing.net/th/id/OIP.svSxRO1pZnNQljHQSXT9pAHaHa?pid=Api&P=0&h=180",
    },
    Qualification: {
      type: String,
    },
    Experience: {
      type: Number,
    },
    Clinic_Name: {
      type: String,
    },
    Address: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
const dentistModel = mongoose.model("dentistData", dentistSchema);
module.exports = { dentistModel };
