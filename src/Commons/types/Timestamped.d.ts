import { Timestamp } from "../../firebase"

export interface Timestamped {
  serverTimestamp: Date
}

export interface RawTimestamped {
  serverTimestamp: Timestamp
}
