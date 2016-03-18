var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productsSchema = new Schema({
    name: String,
    price: Number,
    category: String,
    image: String,
    brewery: String,
    alcohol: Number
});

var ProductsModel = mongoose.model("Products", productsSchema);

module.exports = ProductsModel;
