import * as React from "react"
import { RouteComponentProps } from "react-router"
import BetFactory from "./BetFactory"

interface Params {
  gameID: string
}
type Props = RouteComponentProps<Params>

export default class PrepareGameScreen extends React.PureComponent<Props> {
  render() {
    const { match } = this.props
    const gameID = match.params.gameID
    return <BetFactory gameID={gameID} />
  }
}
