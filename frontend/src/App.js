import { useState, useEffect, useRef } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const isSelecting = useRef(false);

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
    if (isSelecting.current) {
      isSelecting.current = false;
      return;
    }

    if (query.trim().length < 2) {
      setCards([]);
      setShowSuggestions(false);
      return;
    }

    const timeout = setTimeout(() => {
      searchCards();
      setShowSuggestions(true);
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);;

  const handleSelectCard = (card) => {
    isSelecting.current = true;
    setSelectedCard(card);
    setQuery(card.name);
    setShowSuggestions(false);
  };

  return (
    <div className="page">
      <h1 className="title">Search a card</h1>

      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedCard(null);
          }}
          onFocus={() => {
            if (cards.length > 0) {
              setShowSuggestions(true);
            }
          }}
          placeholder="Ex: Blue-Eyes White Dragon"
          className="search-input"
        />

        {loading && <p>Loading...</p>}

        {showSuggestions && cards.length > 0 && (
          <div className="suggestions">
            {cards.slice(0, 8).map((card) => (
              <div
                key={card.id}
                className="suggestion-item"
                onClick={() => handleSelectCard(card)}
              >
                {card.card_images?.[0]?.image_url && (
                  <img
                    src={card.card_images[0].image_url}
                    alt={card.name}
                    className="suggestion-image"
                  />
                )}

                <div className="suggestion-text">
                  <strong>{card.name}</strong>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedCard && (
        <div className="card">
          {selectedCard.card_images?.[0]?.image_url && (
            <img
              src={selectedCard.card_images[0].image_url}
              alt={selectedCard.name}
              className="imagecard"
            />
          )}
          <div className="cardinfo">
            <h2 className="cardname">{selectedCard.name}</h2>
            <p>{selectedCard.type} {selectedCard.race} {selectedCard.atk} {selectedCard.def}</p>
            <p>{selectedCard.desc}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;