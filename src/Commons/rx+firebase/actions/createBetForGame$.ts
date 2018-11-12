import { DocumentReference } from "../../../firebase"
import { Bet } from "../../types/Bet"
import { Game } from "../../types/Game"
import { createBetForRef } from "./createBetForRef"
import { betsRefForGame } from "../utils/betsRefForGame"
import { Document } from "../../types/Document"

// Sets the active game in the firestore
export const createBetForGame = (
  bet: Bet,
  game: Game & Document,
): Promise<DocumentReference> => createBetForRef(betsRefForGame(game), bet)
