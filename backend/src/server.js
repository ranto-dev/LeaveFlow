const express = require("express");
const connectDB = require("./config/db.js");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const seedAdmin = require("./seed/admiin.seed.js");

// Configuration de l'importation des variables d'environemùent
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Appel à la connexion à la base de donnée

// Middlewares
app.use(express.json());
app.use(express.urlencoded({}));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Déclaration des routes
app.use("/api/auth", require("./routes/auth.routes.js"));
app.use("/api/admin", require("./routes/admin.routes.js"));
app.use("/api/worker", require("./routes/employee.routes.js"));
app.use("/api/manager", require("./routes/manager.routes.js"));

(async () => {
  await connectDB();
  await seedAdmin();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
