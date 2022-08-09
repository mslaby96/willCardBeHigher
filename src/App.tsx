import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { GameStateContextWrapper } from "./GameContext/GameStateContext";
import GameManager from "./GameManager/GameManager";
import Score from "./Score/Score";

const queryClient = new QueryClient();

export default function App() {
  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <GameStateContextWrapper>
          <Score />
          <GameManager />
        </GameStateContextWrapper>
      </QueryClientProvider>
    </React.Fragment>
  );
}
