import * as React from "react"
import Grid from "@material-ui/core/Grid"
import {
  withPendingBetsForGame,
  Props as BetsProps,
} from "../../Commons/rx+firebase/withPendingBetsForGame"
import ScreenSpinner from "../../components/ScreenSpinner"
import { Game } from "../../Commons/types/Game"
import PendingBetCell from "./PendingBetCell"
import {
  Button,
  createStyles,
  Typography,
  withStyles,
  WithStyles,
} from "@material-ui/core"
import { EMPTY, from, merge, Observable, Subject, Subscription } from "rxjs"
import { catchError, finalize, map, switchMap, tap } from "rxjs/operators"
import { setTemplateBets } from "../../Commons/rx+firebase/actions/setTemplateBets"
import { confirmPendingBets } from "../../Commons/rx+firebase/actions/confirmPendingBets"
import { deleteBets } from "../../Commons/rx+firebase/actions/deleteBets"
import { Document } from "../../Commons/types/Document"

export interface Props extends BetsProps, WithStyles<typeof styles> {
  game: Game & Document
}

interface State {
  loading: boolean
  selectedIDs: string[]
}

class PendingBetList extends React.PureComponent<Props, State> {
  state = {
    loading: false,
    selectedIDs: [],
  }
  onConfirm: () => void
  onDelete: () => void
  onTemplate: () => void
  events$: Observable<any>
  subscription: Subscription

  constructor(props: Props) {
    super(props)

    const confirm = new Subject<void>()
    this.onConfirm = () => confirm.next()
    const onConfirm$ = confirm.asObservable().pipe(
      tap(() => this.setState({ loading: true })),
      map(() => {
        const selectedIDSet = new Set<string>(this.state.selectedIDs)
        return this.props.bets.filter(bet => selectedIDSet.has(bet.id))
      }),
      switchMap(bets =>
        from(confirmPendingBets(this.props.game, bets)).pipe(
          tap(() => this.setState({ selectedIDs: [] })),
          catchError(() => EMPTY),
          finalize(() => this.setState({ loading: false })),
        ),
      ),
    )

    const deletion = new Subject<void>()
    this.onDelete = () => deletion.next()
    const onDelete$ = deletion.asObservable().pipe(
      map(() => {
        const selectedIDSet = new Set<string>(this.state.selectedIDs)
        return this.props.bets.filter(bet => selectedIDSet.has(bet.id))
      }),
      switchMap(bets =>
        from(deleteBets(this.props.game, bets)).pipe(
          tap(() => this.setState({ selectedIDs: [] })),
          catchError(() => EMPTY),
          finalize(() => this.setState({ loading: false })),
        ),
      ),
    )

    const template = new Subject<void>()
    this.onTemplate = () => template.next()
    const onTemplate$ = template.asObservable().pipe(
      tap(() => this.setState({ loading: true })),
      map(() => {
        const selectedIDSet = new Set<string>(this.state.selectedIDs)
        return this.props.bets.filter(bet => selectedIDSet.has(bet.id))
      }),
      switchMap(bets =>
        from(setTemplateBets(this.props.game, bets)).pipe(
          tap(() => this.setState({ selectedIDs: [] })),
          catchError(() => EMPTY),
          finalize(() => this.setState({ loading: false })),
        ),
      ),
    )

    this.events$ = merge(onConfirm$, onDelete$, onTemplate$)
  }

  componentDidMount() {
    this.subscription = this.events$.subscribe()
  }

  componentWillUnmount() {
    this.subscription.unsubscribe()
  }

  onSelect = (betID: string) => () =>
    this.setState(state => ({
      selectedIDs: [...state.selectedIDs, betID],
    }))

  onDeselect = (betID: string) => () =>
    this.setState(state => ({
      selectedIDs: state.selectedIDs.filter(id => id !== betID),
    }))

  render() {
    if (!this.props.betsLoaded) {
      return <ScreenSpinner />
    }
    const { game, bets, classes } = this.props
    const { loading } = this.state
    const selectedIDSet = new Set<string>(this.state.selectedIDs)
    const hasBetsSelected = this.state.selectedIDs.length > 0
    return (
      <Grid container spacing={8}>
        <Grid item>
          <Typography variant="subheading" color="primary">
            Ready To Go Live Bets
          </Typography>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            onClick={this.onConfirm}
            disabled={!hasBetsSelected || loading}
          >
            Move to Live ({selectedIDSet.size} selected bets)
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={this.onTemplate}
            disabled={!hasBetsSelected || loading}
          >
            Move to Template ({selectedIDSet.size} selected bets)
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={this.onDelete}
            disabled={!hasBetsSelected || loading}
          >
            Remove ({selectedIDSet.size} selected bets)
          </Button>
        </Grid>
        <div className={classes.list}>
          {bets.map(bet => (
            <PendingBetCell
              key={bet.id}
              bet={bet}
              game={game}
              selected={selectedIDSet.has(bet.id)}
              onClick={
                loading
                  ? undefined
                  : selectedIDSet.has(bet.id)
                    ? this.onDeselect(bet.id)
                    : this.onSelect(bet.id)
              }
            />
          ))}
        </div>
      </Grid>
    )
  }
}

const styles = createStyles({
  list: {
    minHeight: 150,
  },
})

export default withPendingBetsForGame(withStyles(styles)(PendingBetList))
