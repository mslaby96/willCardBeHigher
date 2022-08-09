import axios from "axios";
import { ICardResponse, IDeck } from "./models";

export async function ShuffleCards(): Promise<IDeck> {
  return axios
    .get<IDeck>("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then((res) => res.data);
}

export async function DrawACard(deckId: string): Promise<ICardResponse> {
  return axios
    .get<ICardResponse>(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    )
    .then((res) => res.data);
}
