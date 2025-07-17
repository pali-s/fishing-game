import React, { useState, useEffect } from 'react'

const App = () => {
  const [flippedTiles, setFlippedTiles] = useState(Array(6).fill(false));
  const [playerturn, setPlayerTurn] = useState(1);
  const [number, setNumber] = useState(null);
  const [count, setCount] = useState(null);
  const [count1, setCount1] = useState(null);

  const pondColors = [
    'bg-teal-400', 'bg-teal-500',
    'bg-blue-400', 'bg-blue-500',
    'bg-cyan-400', 'bg-cyan-500',
    'bg-emerald-400', 'bg-emerald-500',
    'bg-sky-400', 'bg-sky-500',
    'bg-lime-400'
  ];

  const getRandomColor = () => {
    return pondColors[Math.floor(Math.random() * pondColors.length)];
  };

  const [colors] = useState(() =>
    Array.from({ length: 6 }, () => getRandomColor())
  );


  const handleClick = (index) => {
    if (flippedTiles[index]) return; // Prevent action if already flipped
    const newNumber = Math.floor(Math.random() * (6 - 1 + 1)) + 1;

    const newFlippedTiles = [...flippedTiles];
    newFlippedTiles[index] = true;
    setFlippedTiles(newFlippedTiles);

    setNumber(newNumber);

    if (playerturn === 1) {
      setCount(prevCount => prevCount + newNumber);
      setPlayerTurn(2);
    } else {
      setCount1(prevCount1 => prevCount1 + newNumber);
      setPlayerTurn(1);
    }
    console.log("Player " + playerturn + " rolled: " + newNumber);
    console.log("Player 1 total: " + count);
    console.log("Player 2 total: " + count1);
  }
  // useEffect(() => {
  //   console.log("Player 1 total: ", count);
  // }, [count]);

  // useEffect(() => {
  //   console.log("Player 2 total: ", count1);
  // }, [count1]);


  return (
    <div className="min-h-screen bg-sky-100 flex items-center justify-center">

      <div className="grid grid-cols-4 grid-rows-3 gap-4 bg-sky-100 rounded-xl shadow-xl max-w-lg w-full">
        {/* {tiles.map((_, i) => (
  <div
    key={i}
    className={`p-4 shadow-inner rounded ${colors[i]} ${flippedTiles[i] ? 'opacity-50 cursor-not-allowed' : ''}`}
    onClick={() => handleClick(i)}
  >
    {flippedTiles[i] ? numbers[i] : ''}
  </div>))} */}
        <div className={`row-span-2 ${colors[0]} rounded shadow-inner p-4 ${flippedTiles ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={handleClick}>{flippedTiles ? number : ''}</div>
        <div className={`col-span-2 ${colors[1]} rounded shadow-inner p-4`} onClick={handleClick}>12</div>
        <div className={`row-span-3 col-start-4 ${colors[2]} rounded shadow-inner p-4`} onClick={handleClick}>13</div>
        <div className={`row-span-2 col-start-3 row-start-2 ${colors[3]} rounded shadow-inner p-4`} onClick={handleClick}>14</div>
        <div className={`col-span-2 col-start-1 row-start-3 ${colors[4]} rounded shadow-inner p-4`} onClick={handleClick}>15</div>
        <div className={`col-start-2 row-start-2 ${colors[5]} rounded shadow-inner p-4`} onClick={handleClick}>16</div>
      </div>

    </div>


  )
}

export default App
