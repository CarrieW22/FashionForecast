const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect("mongodb+srv://cgw2:iMW4epuOrfQindW3@cluster0.najaasc.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;