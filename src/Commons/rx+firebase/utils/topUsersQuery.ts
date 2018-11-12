import { Query } from "../../../firebase"
import { usersRef } from "../refs"

export const topUsersQuery = (n: number, orderBy: string = "credits"): Query =>
  usersRef.orderBy(orderBy, "desc").limit(n)
