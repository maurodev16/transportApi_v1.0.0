const mongoose = require("mongoose");
const pickUpLocalizationSchema = new mongoose.Schema({
    latitude:  {
        type : String,
    },   
    longitude:  {
        type : String,
    },     
});
module.exports = mongoose.model("PickUpLocalization",pickUpLocalizationSchema);