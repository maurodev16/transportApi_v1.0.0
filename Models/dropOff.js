const mysql = require("mysql");
const dropOffLocalizationSchema = new mysql.Schema({  
    latitude:  {
        type : String,
    },   
    longitude:  {
        type : String,
    },     
});
module.exports = mysql.model("DropOffLocalization", dropOffLocalizationSchema);