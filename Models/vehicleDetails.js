const mongoose = require("mongoose");
const vehicleDetailsSchema = new mongoose.Schema(
  {
    vehicleName: {
      type: String,
      required: "Vehicle Name is required!",
    },
    vehicleColor: {
      type: String,
      required: "Vehicle Color is required!",
    },
    vehicleModelo: {
      type: String,
      required: "Vehicle Model is required!",
    },
    vehicleLicensePlate: {
      type: String,
      required: "The License Plate is required!",
    },
    vehicleType: {
      type: String,
      required: "Vehicle Type is required!",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("VehicleDetails", vehicleDetailsSchema);
