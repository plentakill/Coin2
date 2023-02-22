import React from 'react';
import { useParams } from 'react-router-dom';

function CoinItem({ coins }) {
  const { id } = useParams();
  const coin = coins.find((coin) => coin.id === id);

  if (!coin) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{coin.name}</h1>
      <p>Symbol: {coin.symbol}</p>
      <p>Price: {coin.current_price}</p>
      <p>Price Change (24h): {coin.price_change_percentage_24h}%</p>
    </div>
  );
}

export default CoinItem;