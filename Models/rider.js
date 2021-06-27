const mongoose = require("mongoose");
const RiderSchema = new mongoose.Schema({
  firstname: {
    type: String,
    require: true,
    required: "First Name is required!",
  },
  lastname: {
    type: String,
    require: true,
    required: "Last Name is required!",
  },
  email: {
    type: String,
    require: true,
    required: "Email is required!",
    unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
    require: true,
    required: "Phone is required!",
  },
  password: {
    type: String,
    require: true,
    required: "Password is required!",
    select: false,
  },
  createdAt: { type: Date, default: Date.now },
});

 module.exports =  mongoose.model("Rider", RiderSchema);;
