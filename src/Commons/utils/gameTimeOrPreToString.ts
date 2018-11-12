import { GameTimeOrPre } from "../types/GameTimeOrPre"
import { gameTimeToString } from "./gameTimeToString"

export const gameTimeOrPreToString = (gameTime: GameTimeOrPre) =>
  gameTime === "pre" ? "pregame" : gameTimeToString(gameTime)
