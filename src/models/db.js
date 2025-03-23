const mongoose = require("mongoose");
require("dotenv").config(); 

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_URI no está definido en .env");
    }

    await mongoose.connect(MONGO_URI);
    console.log("Conectado a la base de datos", MONGO_URI);
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
