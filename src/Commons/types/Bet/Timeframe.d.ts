export type Timeframe =
  | {
      type: "game"
    }
  | {
      type: "period" | "drive"
      sequenceNumber: number
    }

export type TimeframeType = Timeframe["type"]
