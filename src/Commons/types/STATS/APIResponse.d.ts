import { ApiResult } from "./APIResult"

export interface APIResponse {
  status: string
  recordCount: number
  startTimestamp: string
  endTimestamp: string
  timeTaken: number
  apiResults: ApiResult[]
}
