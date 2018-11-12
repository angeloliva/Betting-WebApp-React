import { Game } from "./Game"

export interface GameWithIsCurrent extends Game {
  isCurrent: boolean
}
