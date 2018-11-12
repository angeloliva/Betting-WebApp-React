import * as React from "react"
import UpcomingGamesLoader from "./UpcomingGames/UpcomingGamesLoader"
import SimulatorLoader from "./Simulator/SimulatorLoader"
import PlayerLoader from "./Player/PlayerLoader"
import PrepareGameLoader from "./PrepareGame/PrepareGameLoader"

export interface RouteSpec {
  rootRoute: boolean
  name: string
  path: string
  component: React.ComponentType
}

const routes: RouteSpec[] = [
  {
    rootRoute: true,
    name: "Upcoming Games",
    path: "/upcoming",
    component: UpcomingGamesLoader,
  },
  {
    rootRoute: true,
    name: "Simulator",
    path: "/simulator",
    component: SimulatorLoader,
  },
  {
    rootRoute: false,
    name: "Prepare Game",
    path: "/prepare/:gameID",
    component: PrepareGameLoader,
  },
  {
    rootRoute: true,
    name: "Bet Factory",
    path: "/prepare",
    component: PrepareGameLoader,
  },
  {
    rootRoute: true,
    name: "Players",
    path: "/players",
    component: PlayerLoader,
  },
]

export default routes
