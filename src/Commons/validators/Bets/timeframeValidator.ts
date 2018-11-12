import { Timeframe } from "../../types/Bet/Timeframe"
import { Validator } from "../Validator"

export const timeframeValidator: Validator<Timeframe> = timeframe => {
  switch (timeframe.type) {
    case "game":
      return null
    case "period": {
      const period = timeframe.sequenceNumber
      if (period !== Math.round(period)) {
        return "sequenceNumber: must be an integer"
      }
      if (period < 1 || period > 4) {
        return "sequenceNumber: must be between 1 and 4 (inclusive)"
      }
      return null
    }
    case "drive": {
      const driveID = timeframe.sequenceNumber
      if (driveID !== Math.round(driveID)) {
        return "sequenceNumber: must be an integer"
      }
      if (driveID < 1) {
        return "sequenceNumber: must be between positive"
      }
      return null
    }
    default:
      return "type: invalid"
  }
}
