const express = require("express");
const connectDB = require("./config/db.js");
const dotenv = require("dotenv");

// Configuration de l'importation des variables d'environemùent
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Appel à la connexion à la base de donnée
connectDB();

// Middleware qui permet de traiter les données de la request
app.use(express.json());
app.use(express.urlencoded({}));

// Déclaration des routes
app.use("/api/auth", require("./routes/auth.routes.js"));
app.use("/api/users", require("./routes/user.routes.js"));
app.use("/api/employee", require("./routes/employee.routes.js"));
app.use("/api/gestionnaire", require("./routes/manager.routes.js"));

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
