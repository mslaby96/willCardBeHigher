import { Button, CircularProgress, Dialog, DialogTitle } from "@mui/material";
import { useGameStateContext } from "../GameContext/GameStateContext";
import { Action, ICardResponse, IDeck } from "../shared/models";

import Card from "../Card/Card";
import History from "../History/History";
import { useEffect } from "react";

import "./GameManager.css";
import { DrawACard, ShuffleCards } from "../shared/api";
import { useQuery } from "@tanstack/react-query";

const GameManager = () => {
  const { gameState, dispatchGameState } = useGameStateContext();

  useEffect(() => {
    dispatchGameState({
      type: "STARTGAME",
    });
  }, []);

  const shuffledCards = useQuery(["shuffleCards", gameState], ShuffleCards, {
    onSuccess: (data: IDeck) => {
      dispatchGameState({
        type: "SETDECK",
        payload: { deckId: data.deck_id },
      });
    },
    onError: () => {
      console.error("Something went wrong with the server");
    },
    enabled: gameState.deckId === "" || !gameState.deckId,
    staleTime: Infinity,
  });

  const drawnCard = useQuery(
    ["drawCard", gameState.deckId],
    () => DrawACard(gameState.deckId),
    {
      onSuccess: (data: ICardResponse) => {
        dispatchGameState({ type: "FIRSTCARD", payload: { data: data } });
      },
      onError: () => {
        console.error("Something went wrong with the server");
      },
      enabled: !!gameState.deckId && !gameState.currentCard,
      staleTime: Infinity,
    }
  );

  const handleNewGame = () => {
    const action: Action = {
      type: "NEWGAME",
    };
    dispatchGameState(action);
  };

  const handleResumeGame = () => {
    const resumedGameState = JSON.parse(localStorage.getItem("gameState")!);
    const action: Action = {
      type: "RESUMEGAME",
      payload: { resumedGameState: resumedGameState },
    };
    dispatchGameState(action);
  };
  return (
    <div>
      <Dialog open={gameState.canResumeGame}>
        <DialogTitle>Reload the previous game?</DialogTitle>
        <div className="gameManager-dialog--buttons">
          <Button onClick={handleResumeGame}>Yes</Button>
          <Button onClick={handleNewGame}>No</Button>
        </div>
      </Dialog>
      {gameState.round >= 30 && (
        <div className="gameManager-gameOver">
          <h1>Congratulations!</h1>
          <h2>Your score is: {gameState.score} </h2>
          <Button variant="contained" onClick={handleNewGame}>
            New Game
          </Button>
        </div>
      )}
      <div>
        {gameState.showGame && (
          <div className="gameManager-container">
            <div className="gameManager-emptyDiv"></div>
            {shuffledCards.isFetching || drawnCard.isFetching ? (
              <div className="gameManager-loading">
                <CircularProgress />
              </div>
            ) : (
              <Card />
            )}
            <History />
          </div>
        )}
      </div>
    </div>
  );
};

export default GameManager;
