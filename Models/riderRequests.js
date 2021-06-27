const mongoose = require("mongoose");
const rideRequestsSchema = new mongoose.Schema(
  {
    rideRequest_Id: {
      type: mongoose.Schema.Types.ObjectId,
      required: "Ride Request Id is required!",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("RiderRequests", rideRequestsSchema);
