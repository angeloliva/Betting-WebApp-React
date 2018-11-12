import { gamesRef } from "../refs"

export const gameRefForId = (id: string) => gamesRef.doc(id)
