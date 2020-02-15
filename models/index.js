const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
// To fix deprication warnings
mongoose.set("useNewUrlParser", true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect( process.env.DATABASEURL || "mongodb://localhost/me2big");

module.exports.User = require("./user");