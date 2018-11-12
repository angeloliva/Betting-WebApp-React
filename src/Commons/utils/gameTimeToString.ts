import { GameTime } from "../types/GameTime"

export const gameTimeToString = (gameTime: GameTime) =>
  `${gameTime.time} in Q${gameTime.period}`
