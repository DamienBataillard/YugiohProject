import { useState, useEffect } from "react";
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

      console.log(res)

      setCards(res.data.data || []);
    } catch (error) {
      console.error(error);
      setCards([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.trim().length < 2) {
      setCards([]);
      return;
    }

    const timeout = setTimeout(() => {
      searchCards(query);
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="page">
      <h1 className="title">Research a yu gi oh card</h1>

      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ex: Blue-Eyes White Dragon"/>

      {loading && <p>Loading...</p>}

      <div className="result">
        {cards.map((card) => (
          <div className="slot">
            {card.card_images?.[0]?.image_url && (
                  <img src={card.card_images[0].image_url} alt={card.name} className="imagecard"/>
                )}
            <div className="card">
              <h2 className="cardname">{card.name}</h2>
                <p>{card.type} {card.race} {card.attribute} {card.level} {card.atk} {card.def} </p>
                <p>{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;