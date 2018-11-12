// Information of the team
export interface Team {
  // unique ID in the STATS database
  statsID: number
  // the city where the team originates from
  location: string
  // Name of the team
  name: string
  // Abbreviated version of the name
  shortName: string
  // the color of the team
  color?: string
}
