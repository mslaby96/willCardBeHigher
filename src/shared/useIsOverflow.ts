import * as React from "react";
import { useGameStateContext } from "../GameContext/GameStateContext";

//custom hook to check if div element overflows
export const useIsOverflow = (
  ref: React.MutableRefObject<HTMLDivElement | null>,
  callback: (overflow: boolean) => void
): boolean => {
  const { gameState, dispatchGameState } = useGameStateContext();

  React.useEffect(() => {
    const { current } = ref;

    const trigger = () => {
      if (current) {
        const hasOverflow = current.scrollHeight > current.clientHeight;

        dispatchGameState({
          type: "SETOVERFLOW",
          payload: { isOverflow: hasOverflow },
        });

        if (callback) callback(hasOverflow);
      }
    };

    trigger();
  }, [callback, ref]);

  return gameState.isOverflow;
};
