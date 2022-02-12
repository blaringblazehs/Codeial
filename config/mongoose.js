const mongoose = require("mongoose");
const { isModuleNamespaceObject } = require("util/types");
mongoose.connect("mongodb://localhost/codeial_development");
const db = mongoose.connection;
db.on("error", console.error.bind("Error connecting to db"));
db.once("open", function () {
    console.log("connnected to mongodb");
});

module.exports = db;
