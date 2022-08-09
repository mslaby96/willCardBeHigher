import { Button } from "@mui/material";
import { useRef } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useGameStateContext } from "../GameContext/GameStateContext";
import { ICardHistory } from "../shared/models";
import { useIsOverflow } from "../shared/useIsOverflow";

import "./History.css";

const History = () => {
  const { gameState, dispatchGameState } = useGameStateContext();

  const ref = useRef<HTMLDivElement | null>(null);
  const isOverflow = useIsOverflow(ref, () => {});

  //expand or collapse the card history
  const handleShowHistory = (showMore: boolean) => {
    const container = document.getElementById("history-container");
    if (container) {
      dispatchGameState({
        type: "SETSHOWHISTORY",
        payload: { showFullHistory: showMore, container: container },
      });
    }
  };

  return (
    <div>
      <div
        className="history-container--collapsed"
        id="history-container"
        ref={ref}
      >
        <h2>History:</h2>
        {gameState.cardHistory && (
          <TransitionGroup component="div" className="history-cardContainer">
            {gameState.cardHistory.map((ch: ICardHistory, index) => (
              //for animation purposes
              <CSSTransition key={index} timeout={500} classNames="item">
                <div className="history-cardContainer-oneResult">
                  <img
                    src={ch.currentCard?.image}
                    alt={`${ch.currentCard?.value}${ch.currentCard?.suit}`}
                    key={ch.currentCard?.code}
                  />
                  <img
                    src={ch.previousCard?.image}
                    alt={`${ch.previousCard?.value}${ch.previousCard?.suit}`}
                    key={ch.previousCard?.code}
                  />
                  <div className="history-result">
                    {ch.isSuccess === true && (
                      <span className="history-result--corect">+0.1</span>
                    )}{" "}
                    {ch.isSuccess === false && (
                      <span className="history-result--wrong"> -0.1</span>
                    )}
                  </div>
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </div>
      {gameState.cardHistory && gameState.cardHistory.length > 0 && (
        <div>
          {gameState.showFullHistory ? (
            <Button onClick={() => handleShowHistory(false)}>Collapse</Button>
          ) : (
            <div>
              {isOverflow && (
                <Button onClick={() => handleShowHistory(true)}>Expand</Button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default History;
