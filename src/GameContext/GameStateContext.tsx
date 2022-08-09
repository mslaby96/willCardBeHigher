import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { Action, ICardHistory, IGameState } from "../shared/models";
import { GameStateReducer, initialState } from "../shared/reducers";

export const mockCard: ICardHistory = {
  currentCard: null,
  previousCard: null,
  isSuccess: false,
};
interface IContextProps {
  gameState: IGameState;
  dispatchGameState: Dispatch<Action>;
}

const GameStateContext = createContext({} as IContextProps);

export function GameStateContextWrapper({
  children,
}: {
  children: JSX.Element[];
}) {
  const [gameState, dispatchGameState] = useReducer(
    GameStateReducer,
    initialState
  );

  const contextValue = useMemo(() => {
    return { gameState, dispatchGameState };
  }, [gameState, dispatchGameState]);

  useEffect(() => {
    if (gameState.canResumeGame === false && gameState !== initialState) {
      localStorage.setItem("gameState", JSON.stringify(gameState));
    }
  }, [gameState]);

  return (
    <GameStateContext.Provider value={contextValue}>
      {children}
    </GameStateContext.Provider>
  );
}

export function useGameStateContext() {
  return useContext(GameStateContext);
}
