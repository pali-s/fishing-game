import { Routes, Route } from 'react-router-dom';
import GameScreen from './component/gameScreen.jsx';
import TrashTalkScreen from './component/trashTalk.jsx';
import { useState } from 'react';

function App() {
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <>
        <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleMute}
          className="absolute top-4 right-4 text-2xl p-2 rounded-full bg-pink-800 hover:bg-pink-200 transition-all duration-200 shadow-md"
        >
          {isMuted ? '🔇': '🔊'}
        </button>
        </div>

      <Routes>
        <Route path="/" element={<GameScreen isMuted={isMuted} />} />
        <Route path="/trash-talk" element={<TrashTalkScreen isMuted={isMuted} />} />
      </Routes>
    </>
  );
}

export default App;
