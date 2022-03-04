const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
  name: String,
  type: String, 
  source: String,  
});


const User = mongoose.model("User", UserSchema);

module.exports = User;