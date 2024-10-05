const {INTERNALSERVERERROR} = require("../helpers/sendResponse")

function errorHandler(err, req, res, next) {
    console.error(err.stack);
    INTERNALSERVERERROR(res,err)
  }

  module.exports = {INTERNALSERVERERROR}