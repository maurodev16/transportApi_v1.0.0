const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
    unique: true,
    lowercase: true,     
    required: 'Please enter your email',
    trim: true,
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
role:{
  type: String,
  default:'basic',
  enum:["basic", "supervisor", "admin"]
},
accessToken:{type:String},
  createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model("User", userSchema);
