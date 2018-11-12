import { GameTime } from "../GameTime"

export type ActiveTime =
  | {
      isPregame: true
      end?: GameTime
    }
  | {
      isPregame: false
      start: GameTime
      end?: GameTime
    }
