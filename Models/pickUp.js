const mysql = require("mysql");
const pickUpLocalizationSchema = new mysql.Schema({
    latitude:  {
        type : String,
    },   
    longitude:  {
        type : String,
    },     
});
module.exports = mysql.model("PickUpLocalization",pickUpLocalizationSchema);