import { teamsRef } from "../refs"

export const teamRefForId = (id: number) => teamsRef.doc(id.toString())
