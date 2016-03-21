var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var usersSchema = new Schema({
  username: {
      type: String,
      trim: true
  },
  password: {
      type: String,
      trim: true
  },
  email: {
      type: String,
      trim: true
  },
  firstname: {
      type: String,
      trim: true
  },
  lastname: {
      type: String,
      trim: true
  },
  roletype: {
      type: String,
      trim: true
  }
});

var UsersModel = mongoose.model("Users", usersSchema);

module.exports = UsersModel;
