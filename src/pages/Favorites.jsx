import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (err) {
        console.error("Error parsing favorites:", err);
      }
    }
  }, []);

  const handleRemove = (id) => {
    const updated = favorites.filter(coin => coin.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  if (favorites.length === 0) {
    return <p>No tenés criptomonedas favoritas guardadas.</p>;
  }

  return (
    <div>
      <h2>Mis Criptomonedas Favoritas</h2>
      <ul>
        {favorites.map((coin) => (
          <li key={coin.id}>
            <Link to={`/coin/${coin.id}`}>
              {coin.name} - ${parseFloat(coin.priceUsd).toFixed(2)}
            </Link>
            <button onClick={() => handleRemove(coin.id)} style={{ marginLeft: "10px" }}>
              Quitar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favorites;
