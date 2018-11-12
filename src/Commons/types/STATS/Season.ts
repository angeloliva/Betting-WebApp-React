import { EventType } from "./EventType"

export interface Season {
  season: number
  name: string
  isActive: boolean
  eventType: EventType[]
}
