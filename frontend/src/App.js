import { useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchCards = async () => {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:3001/api/cards", {
        params: { name: query },
      });

      setCards(res.data.data || []);
    } catch (error) {
      console.error(error);
      setCards([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Research a yu gi oh card</h1>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ex: Blue-Eyes White Dragon"
      />
      <button onClick={searchCards}>Search</button>

      {loading && <p>Loading...</p>}

      <div style={{ marginTop: "20px" }}>
        {cards.map((card) => (
          <div
            key={card.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "15px",
            }}
          >
            <h2>{card.name}</h2>
            <p>{card.type}</p>
            <p>{card.desc}</p>

            {card.card_images?.[0]?.image_url && (
              <img
                src={card.card_images[0].image_url}
                alt={card.name}
                width="200"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;