import { Event } from "./Event"

export interface EventType {
  eventTypeId: number
  name: string
  events: Event[]
}
