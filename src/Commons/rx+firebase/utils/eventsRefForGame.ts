import { Game } from "../../types/Game"
import { gamesRef } from "../refs"
import { CollectionReference } from "../../../firebase"
import { Document } from "../../types/Document"

export const eventsRefForGame = (game: Game & Document): CollectionReference =>
  gamesRef.doc(game.id).collection("events")
