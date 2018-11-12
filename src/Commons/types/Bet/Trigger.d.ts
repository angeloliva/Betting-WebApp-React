export type Trigger = {
  type: TriggerType
  quantity: number
}

export type TriggerType =
  | "passing_yards"
  | "receiving_yards"
  | "rushing_yards"
  | "total_yards"
  | "completions"
  | "receptions"
  | "carries"
  | "tackles"
  | "sacks"
  | "interceptions"
  | "passing_touchdowns"
  | "receiving_touchdowns"
  | "rushing_touchdowns"
  | "touchdowns"
  | "score"
