const mongoose = require("mongoose");
require("dotenv").config()

const connection = mongoose.connect(mongoDB)

module.exports = {connection}