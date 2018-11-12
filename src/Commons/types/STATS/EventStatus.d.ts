export interface EventStatus {
  eventStatusId: number
  period: number
  isActive: boolean
  name: string
  isUnderReview: boolean
  minutes: number
  seconds: number
  down: number
  yardsFromGoal: number
  teamPossessionId: number
  distance: number
  isInjuryTimeout: boolean
}
