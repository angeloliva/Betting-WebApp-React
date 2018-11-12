import { Player } from "./Player"

export interface PlayerInvolved {
  playerInvolvedTypeId: number
  playerInvolvedType: string
  typeSequence: number
  player: Player
}
