import React, { useState, useEffect} from 'react'

const App = () => {
  const [flipped, setFlipped] = useState(false);
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

  const handleClick=() => {
    setFlipped(!flipped);
    const newNumber = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
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
        <div className={`row-span-2 ${getRandomColor()} rounded shadow-inner p-4`} onClick={handleClick}>{flipped ? number : ''}</div>
        <div className={`col-span-2 ${getRandomColor()} rounded shadow-inner p-4`} onClick={handleClick}>12</div>
        <div className={`row-span-3 col-start-4 ${getRandomColor()} rounded shadow-inner p-4`} onClick={handleClick}>13</div>
        <div className={`row-span-2 col-start-3 row-start-2 ${getRandomColor()} rounded shadow-inner p-4`} onClick={handleClick}>14</div>
        <div className={`col-span-2 col-start-1 row-start-3 ${getRandomColor()} rounded shadow-inner p-4`} onClick={handleClick}>15</div>
        <div className={`col-start-2 row-start-2 ${getRandomColor()} rounded shadow-inner p-4`} onClick={handleClick}>16</div>
      </div>

    </div>


  )
}

export default App
