import { Timeframe } from "../../types/Bet/Timeframe"

export const describeTimeframe = (timeframe: Timeframe): string => {
  switch (timeframe.type) {
    case "game":
      return ""
    case "drive":
      return "in this drive"
    case "period":
      switch (timeframe.sequenceNumber) {
        case 1:
          return "in the 1st Quarter"
        case 2:
          return "in the 2nd Quarter"
        case 3:
          return "in the 3rd Quarter"
        default:
          return `in the ${timeframe.sequenceNumber}th Quarter`
      }
  }
}
