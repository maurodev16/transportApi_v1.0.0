const mongoose = require("mongoose");
const dropOffLocalizationSchema = new mongoose.Schema({  
    latitude:  {
        type : String,
    },   
    longitude:  {
        type : String,
    },     
});
module.exports = mongoose.model("DropOffLocalization", dropOffLocalizationSchema);