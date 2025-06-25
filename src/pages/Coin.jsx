import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Coin() {
  const { slug } = useParams();
  const [coin, setCoin] = useState(null);
  const [error, setError] = useState(null);

   useEffect(() => {
    async function fetchCoin() {
      try {
        const res = await fetch(`https://rest.coincap.io/v3/assets/${slug}`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            Accept: 'application/json',
          },
        });
        if (!res.ok) throw new Error('Error fetching coin data');
        const data = await res.json();
        setCoin(data.data);
      } catch (e) {
        setError(e.message);
      }
    }

    fetchCoin();
  }, [slug]);

  const handleAddFavorite = () => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    const exists = stored.some((item) => item.id === coin.id);
    if (!exists) {
      stored.push(coin);
      localStorage.setItem("favorites", JSON.stringify(stored));
      alert("Agregado a favoritos ✅");
    } else {
      alert("Ya está en favoritos.");
    }
  };
      
  if (error) return <div className="error">Error: {error}</div>;
  if (!coin) return <div>Loading...</div>;
  
  return (
    <div className="card">
      <h1>{coin.name}</h1>
      <p>Price: ${parseFloat(coin.priceUsd).toFixed(2)}</p>
      <p>Market Cap: ${parseFloat(coin.marketCapUsd).toFixed(2)}</p>
       <button onClick={handleAddFavorite} style={{ marginTop: "10px" }}>
        Agregar a favoritos
      </button>
    </div>
  );
}

export default Coin;