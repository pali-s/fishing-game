import React, { useState, useEffect } from 'react'

const App = () => {
  const [flippedTiles, setFlippedTiles] = useState(Array(6).fill(false));
  const [playerturn, setPlayerTurn] = useState(1);
  const [numbers, setNumbers] = useState(Array(6).fill(null));
  const [fishImage, setfishImage] = useState(Array(6).fill(null));
  const [count, setCount] = useState(null);
  const [count1, setCount1] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const pondColors = [
    'bg-teal-400', 'bg-teal-500',
    'bg-blue-400', 'bg-blue-500',
    'bg-cyan-400', 'bg-cyan-500',
    'bg-emerald-400', 'bg-emerald-500',
    'bg-sky-400', 'bg-sky-500',
    'bg-lime-400'
  ];

  const fullFishImage = [
    '/Images/1.png',
    '/Images/2.png',
    '/Images/3.png',
    '/Images/4.png',
    '/Images/5.png',
  ]

  const tiles = [
    { extraClasses: 'row-span-2' },
    { extraClasses: 'col-span-2' },
    { extraClasses: 'row-span-3 col-start-4' },
    { extraClasses: 'row-span-2 col-start-3 row-start-2' },
    { extraClasses: 'col-span-2 col-start-1 row-start-3' },
    { extraClasses: 'col-start-2 row-start-2' },
  ]

  const getRandomColor = () => {
    return pondColors[Math.floor(Math.random() * pondColors.length)];
  };

  const getRandomFish = (number) => {
    if (number < 1 || number > 5) {
      console.error("Invalid number: " + number);
      return null; // Return null for invalid numbers
    }
    else {
      return fullFishImage[number - 1];
    }
  }

  const [colors] = useState(() =>
    Array.from({ length: 6 }, () => getRandomColor())
  );


  const handleClick = (index) => {
    if (flippedTiles[index] || gameOver) return; // Prevent action if already flipped

    const reelSound= new Audio('/SFX/fish.mp3');
    reelSound.currentTime = 0; // Reset sound to start
    reelSound.playbackRate = 3.0;
    reelSound.play();

    const newNumber = Math.floor(Math.random() * 5) + 1;
    const newFlippedTiles = [...flippedTiles];
    const newNumbers = [...numbers];
    const newfishImages = [...fishImage];

    newFlippedTiles[index] = true;
    newNumbers[index] = newNumber;

    const selectedFishImage = getRandomFish(newNumber);
    newfishImages[index] = selectedFishImage;

    setFlippedTiles(newFlippedTiles);
    setNumbers(newNumbers);
    setfishImage(newfishImages);

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
    if (newFlippedTiles.every(tile => tile)) {
      setGameOver(true);
      if (count > count1) {
        console.log("Player 1 wins!");
      } else if (count < count1) {
        console.log("Player 2 wins!");
      } else {
        console.log("It's a tie!");
      }
    }
  }

  const resetGame = () => {
    setFlippedTiles(Array(6).fill(false));
    setNumbers(Array(6).fill(null));
    setfishImage(Array(6).fill(null));
    setCount(0);
    setCount1(0);
    setPlayerTurn(1);
    setGameOver(false);
  }

  const winner =
    gameOver && (count > count1 ? 'Player 1 Wins!' : count1 > count ? 'Player 2 Wins!' : 'It’s a Tie!');

  return (
    <div className="p-6 space-y-6 max-w-full mx-auto ">

      <div className="flex justify-between text-lg">
        <div>Player 1: {count}</div>
        <div>Player 2: {count1}</div>
      </div>

      <div className="text-center text-xl font-semibold">
        {gameOver ? winner : `Player ${playerturn}'s Turn`}
      </div>

      <div className="grid grid-cols-6 gap-2 [grid-auto-rows:auto]">
        {tiles.map((tile, i) => (
          <div
            key={i}
            className={`relative w-full h-[500px] overflow-hidden rounded flex items-end justify-center ${flippedTiles[i] ? 'cursor-not-allowed' : ''}`}
            onClick={() => handleClick(i)}
          >
            <div className={`fish-container ${flippedTiles[i] ? 'reveal' : ''}`}>
              <img
                src={flippedTiles[i] ? fishImage[i] : '/Images/fish-head.png'}
                alt="Fish"
                className="w-30 h-auto transition-transform duration-500 ${
      flippedTiles[i] ? '-translate-y-12' : 'translate-y-0'}"
              />
            </div>
          </div>))}
      </div>

      <div className="text-center">
        <button
          onClick={resetGame}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Reset Game
        </button>
      </div>

    </div>


  )
}

export default App
