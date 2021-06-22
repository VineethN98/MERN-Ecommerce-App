// Import .env content
require("dotenv").config();
const mongoose = require("mongoose");

// db
mongoose
  .connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongodb connected successfully");
  })
  .catch((err) => {
    console.log("Error while connecting to mongodb");
    console.log(err);
  });

module.exports = {
  mongoose,
};
