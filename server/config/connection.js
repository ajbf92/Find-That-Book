const mongoose = require('mongoose');

if (process.env.NODE_ENV === "development"){require('dotenv').config();}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
