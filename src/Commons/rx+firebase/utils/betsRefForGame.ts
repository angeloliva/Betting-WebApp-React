import { Game } from "../../types/Game"
import { CollectionReference } from "../../../firebase"
import { Document } from "../../types/Document"
import { betsRefForGameID } from "./betsRefForGameID"

export const betsRefForGame = (game: Game & Document): CollectionReference =>
  betsRefForGameID(game.id)
