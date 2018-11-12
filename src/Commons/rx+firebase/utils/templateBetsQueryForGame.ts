import { Game } from "../../types/Game"
import { gamesRef } from "../refs"
import { Query } from "../../../firebase"
import { Document } from "../../types/Document"

export const templateBetsQueryForGame = (game: Game & Document): Query =>
  gamesRef
    .doc(game.id)
    .collection("bets")
    .where("isTemplate", "==", true)
