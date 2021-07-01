const mysql = require("mysql");
const driverSchema = new mysql.Schema(
  {
    driver_Id: {
      type: mysql.Schema.Types.ObjectId,
      required: "Driver Id is required!",
    },
    firstname: {
      type: String,
      required: "First Name is required!",
    },
    lastname: {
      type: String,
      required: "Last Name is required!",
    },
    email: {
      type: String,
      required: "Email is required!",
    },
    phone: {
      type: String,
      required: "Phone is required!",
    },
    password: {
      type: String,
      required: "Password is required!",
    },
    vehicle: {
      type: mysql.Schema.Types.ObjectId,
      required: "Vehicle is required!",
      ref: "VehicleDetails", ///Referencia o Model "VehicleDetailsSchema"
    },
    createdAt: { type: Date, default: Date.now },
  },
  
);

module.exports = mysql.model("Driver", driverSchema);
