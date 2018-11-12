import { Document } from "./Document"

type BetAnswer = {
  // The answer provided by the user (Yes / No)
  answer: boolean
}

export type BetAnswerDocument = BetAnswer & Document
