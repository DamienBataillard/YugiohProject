const YGOPRO_BASE_URL = "https://db.ygoprodeck.com/api/v7/cardinfo.php";
const router = express.Router();

// Recherche de cartes par nom
router.get("/api/cards", async (req, res) => {
  try {
    const { name, archetype, type } = req.query;

    const params = {};

    if (name) params.fname = name;       // recherche partielle
    if (archetype) params.archetype = archetype;
    if (type) params.type = type;

    const response = await axios.get(YGOPRO_BASE_URL, { params });

    res.json(response.data);
  } catch (error) {
    console.error("Erreur YGOPRODeck:", error.response?.data || error.message);
    res.status(500).json({
      error: "Impossible de récupérer les cartes"
    });
  }
});

// Récupérer une carte précise par son id
router.get("/api/cards/:id", async (req, res) => {
  try {
    const response = await axios.get(YGOPRO_BASE_URL, {
      params: { id: req.params.id }
    });

    res.json(response.data);
  } catch (error) {
    console.error("Erreur YGOPRODeck:", error.response?.data || error.message);
    res.status(500).json({
      error: "Impossible de récupérer cette carte"
    });
  }
});

module.exports = router;