var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: String,
    password: String
});

//var ProductsModel = mongoose.model("Products", productsSchema);

Account.plugin(passportLocalMongoose);

module.exports = Account;