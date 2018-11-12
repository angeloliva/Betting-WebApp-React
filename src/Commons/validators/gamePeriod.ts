export const gamePeriodValidator = (gamePeriod: number, min: number = 1) => {
  if (gamePeriod !== Math.round(gamePeriod)) {
    return "not an integer"
  }
  if (gamePeriod < min) {
    return "too low"
  }
  if (gamePeriod > 4) {
    return "too high"
  }
  return null
}
