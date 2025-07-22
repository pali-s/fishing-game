import { Routes, Route } from 'react-router-dom';
import GameScreen from './component/gameScreen.jsx';
import TrashTalkScreen from './component/trashTalk.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<GameScreen />} />
      <Route path="/trash-talk" element={<TrashTalkScreen />} />
    </Routes>
  );
}

export default App;