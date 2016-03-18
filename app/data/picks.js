var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var picksSchema = new Schema({
    id: Number,
    name: String,
    dateCreated: Date,
    dateUpdated: Date
});

var PicksModel = mongoose.model("Picks", picksSchema);

module.exports = PicksModel;
