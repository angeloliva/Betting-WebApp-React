export type Actor =
  | {
      type: "anyone"
    }
  | {
      type: "team" | "player"
      id: number
    }

export type ActorType = Actor["type"]
