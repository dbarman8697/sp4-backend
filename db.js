const mongoose = require("mongoose");
require("dotenv").config();
const connection = mongoose.connect(
  "mongodb+srv://gagan:gagan@cluster0.jwtqx79.mongodb.net/instaMasai"
);
module.exports = { connection };
 