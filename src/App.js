import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Coins from './components/Coins';
import Coin from './routes/Coin';
import Navbar from './components/Navbar';

function App() {
  const ads = [
    'Advertisement 1',
    'Advertisement 2',
    'Advertisement 3',
    'Advertisement 4'
  ];
  const [adIndex, setAdIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setAdIndex((adIndex + 1) % ads.length);
    }, 10000);
    return () => clearInterval(intervalId);
  }, [adIndex, ads.length]);

  const [coins, setCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const coingeckoUrl =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&sparkline=false';

  useEffect(() => {
    axios
      .get(coingeckoUrl)
      .then((response) => {
        setCoins(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addCoin = (coinId) => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${coinId}`)
      .then((response) => {
        const coinData = {
          id: response.data.id,
          name: response.data.name,
          image: response.data.image.small,
          symbol: response.data.symbol.toUpperCase(),
          current_price: response.data.current_price,
          price_change_percentage_24h:
            response.data.price_change_percentage_24h,
        };
        setCoins((prevCoins) => [...prevCoins, coinData]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCoins = coins.filter((coin) => {
    return coin.id.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path='/'
            element={
              <>
                <input
                  type='text'
                  placeholder='Search'
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <Coins coins={filteredCoins} addCoin={addCoin} />
                <div>{ads[adIndex]}</div>
              </>
            }
          />
          <Route path='/coin/:id' element={<Coin coins={coins} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;