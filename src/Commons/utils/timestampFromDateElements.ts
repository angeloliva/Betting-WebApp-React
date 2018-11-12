import { Timestamp } from "../../firebase"

export const timestampFromDateElements: (
  year: number,
  month: number,
  date?: number,
  hours?: number,
  minutes?: number,
  seconds?: number,
  ms?: number,
) => Timestamp = (year, month, date, hours, minutes, seconds, ms) =>
  timestampFromDate(new Date(year, month, date, hours, minutes, seconds, ms))

export const timestampFromDate: (date: Date) => Timestamp = date =>
  Timestamp.fromDate(date)
