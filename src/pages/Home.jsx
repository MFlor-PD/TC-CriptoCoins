import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function Home() {
  const [coins, setCoins] = useState([]);
  const [error, setError] = useState(null);
 

 useEffect(() => {
  async function fetchCryptos() {
    try {
      const response = await fetch(`https://rest.coincap.io/v3/assets?apiKey=${import.meta.env.VITE_API_KEY}`, {
        headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        Accept: "application/json",
     }
      });
    
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCoins(data.data);
    } catch (error) {
      setError(error.message);
    }
  }

  fetchCryptos();
}, []);

    return (
      <div>
        <h1>Criptomonedas</h1>
        {error && <p>Error: {error}</p>}
        <ul>
          {coins.map(coin => (
            <li key={coin.id}>
              <Link to={`/coin/${coin.id}`}>
                {coin.name} - ${parseFloat(coin.priceUsd).toFixed(2)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }



export default Home;