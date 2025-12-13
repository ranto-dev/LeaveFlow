/**
 * Connexion à la base de donnée MongoDB
 */

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connecté");
  } catch (err) {
    console.log("La connexion à MongoDB a échouée! " + err);
    process.exit();
  }
};

module.exports = connectDB;
