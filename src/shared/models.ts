export interface IDeck {
  success: boolean;
  deck_id: string;
  shuffled: boolean;
  remaining: number;
}

export interface ICardResponse {
  success: boolean;
  deck_id: string;
  cards: ICard[];
  reamining: number;
}

export interface ICard {
  code: string;
  image: string;
  images: string[];
  value: string;
  suit: string;
}

export interface ICardHistory {
  previousCard: ICard | null;
  currentCard: ICard | null;
  isSuccess: boolean | null;
}

export interface IGameState {
  score: number;
  round: number;
  currentCard: ICard | null;
  cardHistory: ICardHistory[];
  canResumeGame: boolean;
  showGame: boolean;
  deckId: string;
  showFullHistory: boolean;
  container: HTMLElement | null;
  isOverflow: boolean;
}

export interface Action {
  type: string;
  payload?: any;
}
