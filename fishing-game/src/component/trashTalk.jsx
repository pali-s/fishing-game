import React, { useEffect, useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

const insults = [
    "TAKE THE L!",
    "You got cooked 🥵",
    "Skill issue 💀",
    "You're not him.",
    "Sent back to the lobby!",
    "Try again, champ.",
    "Install aim.exe",
    "You dropped harder than crypto",
    "L ratio"
];



export default function TrashTalkScreen() {
    const location = useLocation();
    const navigate = useNavigate();
    const loser = location.state?.loser || "You";
    console.log(`Loser: ${loser}`);
    const [insult, setInsult] = useState("");
    const handleReset = () => {
        navigate("/");
    };

    useEffect(() => {
        setInsult(insults[Math.floor(Math.random() * insults.length)]);
        
        // Play sound effect
        const audio = new Audio('/SFX/vine-boom.mp3');
        audio.play().catch((error) => {
            console.error("Error playing sound:", error);
        });

        // Fire confetti
        confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 }
        });
    }, []);

    return (
        <div className="flex items-center justify-center h-screen bg-black text-white">
            <div className="text-center animate-pulse">
                <h1 className="text-6xl font-extrabold text-red-600 drop-shadow-lg animate-bounce">
                    {loser.toUpperCase()}, {insult}
                </h1>
                <p className="mt-4 text-xl text-gray-400">Better luck next time.</p>
                <button
                    onClick={handleReset}
                    className="bg-gradient-to-r from-red-500 via-pink-600 to-purple-700 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg hover:scale-105 hover:from-pink-500 hover:to-red-600 transition-transform duration-300 my-6"
                >
                    Play Again
                </button>
                <p className="mt-4 text-gray-400">Don’t let the L define you.</p>
            </div>
        </div>
    );
}
