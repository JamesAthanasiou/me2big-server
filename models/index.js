const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect( process.env.DATABASEURL || "mongodb://localhost/me2big");

module.exports.User = require("./user");