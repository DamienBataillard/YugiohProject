const express = require("express");
const axios = require("axios");

const router = express.Router();

const YGOPRO_BASE_URL = "https://db.ygoprodeck.com/api/v7/cardinfo.php";

// Recherche de cartes
router.get("/", async (req, res) => {
  try {
    const { name, archetype, type } = req.query;

    const params = {};

    if (name) params.fname = name;
    if (archetype) params.archetype = archetype;
    if (type) params.type = type;

    const response = await axios.get(YGOPRO_BASE_URL, { params });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur API YGOPRODeck" });
  }
});

// Carte par ID
router.get("/:id", async (req, res) => {
  try {
    const response = await axios.get(YGOPRO_BASE_URL, {
      params: { id: req.params.id }
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Carte introuvable" });
  }
});

module.exports = router;