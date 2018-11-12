import { TeamLocationType } from "./TeamLocationType"

export interface Team {
  teamId: number
  location: string
  nickname: string
  abbreviation: string
  playoffSeed: number
  teamLocationType: TeamLocationType
  score: number
  isWinner: boolean
}
