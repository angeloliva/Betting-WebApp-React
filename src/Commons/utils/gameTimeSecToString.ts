import { splitGameTimeSec } from "./splitGameTimeSec"
import { minSecToString } from "./minSecToString"

// Get the "standard" input display1 string for game time
export const gameTimeSecToString = (gameTimeSec: number): string => {
  const { min, sec } = splitGameTimeSec(gameTimeSec)
  return minSecToString(min, sec)
}
