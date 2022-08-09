import { Action, ICardHistory, IGameState } from "./models";

export const initialState: IGameState = {
  score: 0,
  round: 0,
  currentCard: null,
  cardHistory: [],
  canResumeGame: false,
  showGame: false,
  deckId: "",
  showFullHistory: false,
  container: null,
  isOverflow: false,
};

export const GameStateReducer = (state: IGameState, action: Action) => {
  switch (action.type) {
    case "STARTGAME":
      const canResumeGame =
        JSON.parse(localStorage.getItem("gameState")!).cardHistory.length > 0
          ? true
          : false;
      return {
        ...state,
        canResumeGame: canResumeGame,
        showGame: !canResumeGame,
      };
    case "NEWGAME":
      localStorage.clear();
      return {
        ...state,
        currentCard: null,
        cardHistory: [],
        round: 0,
        score: 0,
        deckId: "",
        canResumeGame: false,
        showGame: true,
      };
    case "FIRSTCARD":
      console.log("first card");
      return {
        ...state,
        currentCard: action.payload.data.cards[0],
      };
    case "RESUMEGAME":
      return {
        ...state,
        currentCard: action.payload.resumedGameState.currentCard,
        cardHistory: action.payload.resumedGameState.cardHistory,
        round: action.payload.resumedGameState.round,
        score: action.payload.resumedGameState.score,
        deckId: action.payload.resumedGameState.deckId,
        canResumeGame: false,
        showGame: true,
        isOverflow: action.payload.resumedGameState.isOverflow,
      };
    case "NEXTCARD":
      switch (action.payload.data.value) {
        case "ACE":
          action.payload.data.value = "14";
          break;
        case "KING":
          action.payload.data.value = "13";
          break;
        case "QUEEN":
          action.payload.data.value = "12";
          break;
        case "JACK":
          action.payload.data.value = "11";
          break;
      }
      let check;
      if (+action.payload.data.value !== +state.currentCard?.value!) {
        check = +action.payload.data.value > +state.currentCard?.value!;
      } else {
        check = null;
      }
      const newResult: ICardHistory = {
        currentCard: action.payload.data,
        previousCard: state.currentCard,
        isSuccess: check !== null ? action.payload.isHigher === check : null,
      };
      const newScore = newResult.isSuccess
        ? +(state.score + 0.1).toFixed(1)
        : +(state.score - 0.1).toFixed(1);

      return {
        ...state,
        currentCard: action.payload.data,
        score: newScore,
        round: state.round + 1,
        cardHistory: [...state.cardHistory, newResult],
      };

    case "SETDECK":
      return { ...state, deckId: action.payload.deckId };

    case "SETSHOWHISTORY":
      if (action.payload.showFullHistory) {
        action.payload.container.classList.remove(
          "history-container--collapsed"
        );
        action.payload.container.classList.add("history-container--expanded");
      } else {
        action.payload.container.classList.remove(
          "history-container--expanded"
        );
        action.payload.container.classList.add("history-container--collapsed");
      }
      return { ...state, showFullHistory: action.payload.showFullHistory };

    case "SETOVERFLOW":
      return { ...state, isOverflow: action.payload.isOverflow };

    default:
      return state;
  }
};
