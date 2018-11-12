import { Actor } from "./Bet/Actor"
import { Timeframe } from "./Bet/Timeframe"
import { Trigger } from "./Bet/Trigger"
import { GameTime } from "./GameTime"

export type Bet = BetPublicFields & BetDetails & BetResolution

interface BetPublicFields {
  timestamp?: GameTime
  description: string
  odds: number
  isPublic: boolean
  isTriggeredOut: boolean
  isTemplate: boolean
}

interface BetDetails {
  actor: Actor
  timeframe: Timeframe
  trigger: Trigger
  triggerOutPercent?: number
}

type BetResolution =
  | {
      isResolved: false
    }
  | {
      isResolved: true
      isSuccess: boolean
    }
