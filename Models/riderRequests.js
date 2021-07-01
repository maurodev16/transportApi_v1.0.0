const mysql = require("mysql");
const rideRequestsSchema = new mysql.Schema(
  {
    rideRequest_Id: {
      type: mysql.Schema.Types.ObjectId,
      required: "Ride Request Id is required!",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mysql.model("RiderRequests", rideRequestsSchema);
