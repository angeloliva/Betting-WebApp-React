import { NetworkType } from "./NetworkType"
import { Country } from "./Country"

export interface TvStation {
  tvStationId: number
  name: string
  callLetters: string
  networkType: NetworkType
  country: Country
}
