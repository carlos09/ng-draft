var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var picksSchema = new Schema({
    id: Number,
    name: String,
    dateCreated: Date,
    dateUpdated: Date,
    imgList: {
      uploadedPicks: Object
    }
});

var PicksModel = mongoose.model("Picks", picksSchema);

module.exports = PicksModel;
