import { GameTime } from "./GameTime"
import { Possession } from "./STATS/Possession"
import { PlayType } from "./STATS/PlayType"

export interface PBPEvent extends GameTime {
  playText: string
  distance: number
  down: number
  endYardLine: string
  yardLine: string
  yards: number
  startPossession: Possession
  endPossession: Possession
  playType: PlayType
}
