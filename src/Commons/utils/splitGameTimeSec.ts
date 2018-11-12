export interface SplittedGameTimeSec {
  min: number
  sec: number
}

// Split the game time in seconds into minutes and seconds
export const splitGameTimeSec = (gameTimeSec: number): SplittedGameTimeSec => {
  const min = Math.floor(gameTimeSec / 60)
  const sec = Math.floor(gameTimeSec % 60)
  return { min, sec }
}
