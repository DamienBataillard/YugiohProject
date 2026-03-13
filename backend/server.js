const express = require("express");
const cors = require("cors");

const cardRoutes = require("./routes/cards");

const app = express();

app.use(cors());
app.use(express.json());

// route API
app.use("/api/cards", cardRoutes);

app.listen(3001, () => {
  console.log("Serveur lancé sur http://localhost:3001");
});