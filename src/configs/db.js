const mongoose = require("mongoose");
const {MONGOURI} = require("./keys")

module.exports = () => {
  return mongoose.connect(
        MONGOURI
      // "mongodb+srv://vikas:vikas_123@cluster0.aflw8.mongodb.net/Trek?retryWrites=true&w=majority"
    );
};


