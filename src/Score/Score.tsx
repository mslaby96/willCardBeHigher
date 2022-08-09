import { useGameStateContext } from "../GameContext/GameStateContext";

import "./Score.css";

const Score = () => {
  const { gameState } = useGameStateContext();

  return (
    <div className="topBar-container">
      <div className="score-container">
        <div className="score-container-text">
          <h2>Score:</h2>
          <span className="score-span">{gameState.score}</span>
        </div>
        <div className="score-container-text">
          <h2>Round:</h2>
          <span className="score-span">{gameState.round}/30</span>
        </div>
      </div>
    </div>
  );
};

export default Score;
