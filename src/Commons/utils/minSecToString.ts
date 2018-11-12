export const minSecToString = (min: number, sec: number): string => {
  const minStr = min.toString()
  const secStr = sec < 10 ? `0${sec}` : sec.toString()
  return `${minStr}:${secStr}`
}
