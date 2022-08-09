import { Button } from "@mui/material";
import { useState } from "react";
import { useGameStateContext } from "../GameContext/GameStateContext";
import { DrawACard } from "../shared/api";
import { Action, ICardResponse } from "../shared/models";

import "./Card.css";

const Card = () => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const { gameState, dispatchGameState } = useGameStateContext();

  const handleButtonClick = async (isHigher: boolean) => {
    setIsButtonClicked(true); //to prevent user from double clicking
    await DrawACard(gameState.deckId).then((res: ICardResponse) => {
      const action: Action = {
        type: "NEXTCARD",
        payload: {
          data: res.cards[0],
          isHigher: isHigher,
        },
      };
      dispatchGameState(action);
      setIsButtonClicked(false); //to enable buttons after
    });
  };

  return (
    <div>
      <div className="card-container">
        <h2>Will the next card be higher than this one?</h2>
        <img
          className="card-currentCard"
          src={gameState.currentCard?.image}
          alt={`${gameState.currentCard?.value} ${gameState.currentCard?.suit} `}
        />
        <div className="card-currentCard--buttons">
          <Button
            className="card-decisionButton"
            variant="contained"
            onClick={() => handleButtonClick(false)}
            disabled={isButtonClicked}
            size="small"
          >
            No
          </Button>
          <Button
            className="card-decisionButton"
            variant="contained"
            onClick={() => handleButtonClick(true)}
            disabled={isButtonClicked}
            size="small"
          >
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
