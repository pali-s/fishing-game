import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const gameScreen = ({ isMuted }) => {
    const navigate = useNavigate();

    const [flippedTiles, setFlippedTiles] = useState(Array(6).fill(false));
    const [playerturn, setPlayerTurn] = useState(1);
    const [numbers, setNumbers] = useState(Array(6).fill(null));
    const [fishImage, setfishImage] = useState(Array(6).fill(null));
    const [count, setCount] = useState(null);
    const [count1, setCount1] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    const [player1Name, setPlayer1Name] = useState('Player 1');
    const [player2Name, setPlayer2Name] = useState('Player 2');
    const [isEditingPlayer1, setIsEditingPlayer1] = useState(false);
    const [isEditingPlayer2, setIsEditingPlayer2] = useState(false);

    const handleBlur = (setEditing) => () => setEditing(false);

    const handleKeyDown = (e, setEditing) => {
        if (e.key === 'Enter') {
            setEditing(false);
        }
    };

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

        // const reelSound = new Audio('/SFX/water-drip.mp3');
        // reelSound.currentTime = 0; // Reset sound to start
        // reelSound.playbackRate = 3.0;
        // reelSound.play();

        if (!isMuted) {
            const sound = new Audio('/SFX/water-drip.mp3');
            sound.currentTime = 0; // Reset sound to start
            sound.playbackRate = 3.0; // Speed up the sound
            sound.play();
        }

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
            console.log(count, count1);
        }
    }

    useEffect(() => {
        if (gameOver) {
            if (count > count1) {
                console.log("Player 1 wins!");
                handleLoss(player2Name);
            } else if (count < count1) {
                console.log("Player 2 wins!");
                handleLoss(player1Name);
            } else {
                console.log("It's a tie!");
                handleLoss("Both Players");
            }
        }
    }, [gameOver, count, count1]);

    const handleLoss = (loser) => {
        console.log(`${loser} lost the game!`);
        setTimeout(() => {
            navigate("/trash-talk", { state: { loser } });
        }, 1500);
    };

    const resetGame = () => {
        setFlippedTiles(Array(6).fill(false));
        setNumbers(Array(6).fill(null));
        setfishImage(Array(6).fill(null));
        setCount(0);
        setCount1(0);
        setPlayerTurn(1);
        setGameOver(false);
    }

    const winner = gameOver && (count > count1 ? `${player1Name} Wins!` : count1 > count ? `${player2Name} Wins!` : "It’s a Tie!");

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-lime-100 via-emerald-50 to-green-100 flex flex-col justify-center p-4">
            <div className="text-center z-50 fixed top-4 left-1/2 transform -translate-x-1/2">
                <button
                    onClick={() => setShowInfo(true)}
                    className="bg-gradient-to-r from-lime-400 via-emerald-500 to-green-600 text-white font-bold py-3 px-6 rounded text-lg shadow-xl hover:scale-105 hover:from-emerald-400 hover:to-lime-500 transition-all duration-300 my-6"
                >
                    🪷 Things You Need to Know
                </button>
                <div className="text-center text-2xl font-bold text-pink-800 py-6">
                    {gameOver ? winner : (playerturn == 1 ? `${player1Name}'s Turn` : `${player2Name}'s Turn`)}
                </div>
            </div>

            <div className="flex justify-between text-3xl font-extrabold py-8 text-pink-800">
                <div>
                    🪷{' '}
                    {isEditingPlayer1 ? (
                        <input
                            type="text"
                            value={player1Name}
                            onChange={(e) => setPlayer1Name(e.target.value)}
                            onBlur={handleBlur(setIsEditingPlayer1)}
                            onKeyDown={(e) => handleKeyDown(e, setIsEditingPlayer1)}
                            autoFocus
                            className="bg-transparent border-b-2 border-pink-800 focus:outline-none focus:border-pink-500 mx-2"
                        />
                    ) : (
                        <span
                            onClick={() => setIsEditingPlayer1(true)}
                            className="cursor-pointer hover:underline mx-2"
                        >
                            {player1Name}
                        </span>
                    )}
                    : {count}
                </div>

                <div>
                    🪷{' '}
                    {isEditingPlayer2 ? (
                        <input
                            type="text"
                            value={player2Name}
                            onChange={(e) => setPlayer2Name(e.target.value)}
                            onBlur={handleBlur(setIsEditingPlayer2)}
                            onKeyDown={(e) => handleKeyDown(e, setIsEditingPlayer2)}
                            autoFocus
                            className="bg-transparent border-b-2 border-pink-800 focus:outline-none focus:border-pink-500 mx-2"
                        />
                    ) : (
                        <span
                            onClick={() => setIsEditingPlayer2(true)}
                            className="cursor-pointer hover:underline mx-2"
                        >
                            {player2Name}
                        </span>
                    )}
                    : {count1}
                </div>
            </div>


            <div className="grid grid-cols-6 gap-2 [grid-auto-rows:auto] bg-blue-400 rounded-full px-4 py-2 w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] mx-auto relative overflow-visible shadow-lg">
                {tiles.map((tile, i) => (
                    <div
                        key={i}
                        className={`relative w-full h-[100px] overflow-visible rounded flex items-end justify-center ${flippedTiles[i] ? 'cursor-not-allowed' : ''}`}
                        onClick={() => handleClick(i)}
                    >
                        <div className={`fish-container transition-transform duration-500 ${flippedTiles[i] ? 'reveal' : ''}`}>
                            <img
                                src={flippedTiles[i] ? fishImage[i] : '/Images/fish-head.png'}
                                alt="Fish"
                                className="w-30 h-auto transition-transform duration-500 ${flippedTiles[i] ? '-translate-y-12' : 'translate-y-0'}" style={{ zIndex: 10 }}
                            />
                        </div>
                    </div>))}
            </div>

            <div className="text-center">
                <button
                    onClick={resetGame}
                    className="bg-gradient-to-r to-pink-500 via-pink-400 from-rose-300 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg hover:scale-105 hover:from-pink-500 hover:to-red-600 transition-transform duration-300 my-6"
                >
                    Reset Game
                </button>
            </div>


            {/* Info Modal */}
            {showInfo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 px-4">
                    <div className="relative bg-gradient-to-br from-lime-100 via-emerald-50 to-green-100 border border-green-300 shadow-2xl rounded-3xl p-6 max-w-md w-full">

                        {/* Content */}
                        <h2 className="text-2xl font-bold text-green-700 mb-4 text-center pt-6">🪷 Things You Need to Know</h2>
                        <ul className="space-y-3 text-green-800 text-base font-medium">
                            <li>🎯 Tap a fish head to reveal the full fish.</li>
                            <li>🚫 Tiles cannot be clicked more than once.</li>
                            <li>🌸 Each fish gives different points:</li>
                            <ul className="pl-5 mt-2 space-y-1 list-none">
                                <li className="flex items-center gap-2 text-sm text-green-700">
                                    <img src="/Images/5.png" alt="Fish 5" className="w-8 h-auto" /> = 5 points
                                </li>
                                <li className="flex items-center gap-2 text-sm text-green-700">
                                    <img src="/Images/4.png" alt="Fish 4" className="w-8 h-auto" /> = 4 points
                                </li>
                                <li className="flex items-center gap-2 text-sm text-green-700">
                                    <img src="/Images/3.png" alt="Fish 3" className="w-8 h-auto" /> = 3 points
                                </li>
                                <li className="flex items-center gap-2 text-sm text-green-700">
                                    <img src="/Images/2.png" alt="Fish 2" className="w-8 h-auto" /> = 2 points
                                </li>
                                <li className="flex items-center gap-2 text-sm text-green-700">
                                    <img src="/Images/1.png" alt="Fish 1" className="w-8 h-auto" /> = 1 point
                                </li>
                            </ul>
                            <li>💡 Find high-score fish with strategy and luck!</li>
                        </ul>

                        {/* Close Button */}
                        <button
                            className="absolute top-3 right-4 text-green-600 hover:text-green-800 text-xl font-bold"
                            onClick={() => setShowInfo(false)}
                            aria-label="Close"
                        >
                            ✖
                        </button>
                    </div>
                </div>
            )}



        </div>



    )
}

export default gameScreen;
