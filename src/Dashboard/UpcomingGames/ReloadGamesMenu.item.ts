import { SearchGameParams } from "../../Commons/rx+firebase/actions/reloadGamesData"

export interface MenuItem {
  id: string
  label: string
  searchParams: SearchGameParams
}

export const menuItems: MenuItem[] = [
  {
    id: "nfl-preseason",
    label: "Reload NFL - Preseason",
    searchParams: {
      league: "NFL",
      seasonType: "Preseason",
    },
  },
  {
    id: "nfl-regular",
    label: "Reload NFL - Regular Season",
    searchParams: {
      league: "NFL",
      seasonType: "Regular Season",
    },
  },
  {
    id: "nfl-postseason",
    label: "Reload NFL - Postseason",
    searchParams: {
      league: "NFL",
      seasonType: "Postseason",
    },
  },
]
