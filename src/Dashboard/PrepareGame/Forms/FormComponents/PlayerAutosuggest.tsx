import * as React from "react"
import * as Autosuggest from "react-autosuggest"
import TextField from "@material-ui/core/TextField"
import MenuItem from "@material-ui/core/MenuItem"
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
} from "@material-ui/core/styles"
import { deburr } from "lodash"
import { InputProps, RenderSuggestionParams } from "react-autosuggest"
import { SuggestionsFetchRequestedParams } from "react-autosuggest"
import { Paper } from "@material-ui/core"
import { ChangeEvent } from "react-autosuggest"
import {
  withTeamMembers,
  Props as TeamMembersProps,
} from "../../../../Commons/rx+firebase/withTeamMembers"
import { Game } from "../../../../Commons/types/Game"
import { SuggestionSelectedEventData } from "react-autosuggest"
import { TeamMember } from "../../../../Commons/types/Team/TeamMember"
import { Bet } from "../../../../Commons/types/Bet"

interface Suggestion {
  label: string
  player: TeamMember
  team: {
    id: number
    name: string
  }
  side: "home" | "away"
}

interface Props extends TeamMembersProps, WithStyles<typeof styles> {
  game: Game | null
  bet: Bet
  onChangeBet: (bet: Bet) => any
  updateTeamID?: boolean
  autoFocus?: boolean
}

interface WithTeamID {
  teamID: number
}

interface State {
  single: string
  suggestions: Suggestion[]
}

class PlayerAutosuggest extends React.Component<Props, State> {
  state = {
    single: "",
    suggestions: [],
  }

  component() {
    console.log (this.props)
  }
  async componentDidMount() {
    console.log(this.props)
  }
  setActorName() {
    const { homeTeamMembers, awayTeamMembers, bet } = this.props;
    if (bet.actor.type === "player" && homeTeamMembers.length) {
      const { id } = bet.actor
      homeTeamMembers.forEach(member => {
        if (member.statsID === id) {
          // this.setState({
          //   single: `${member.firstName} ${member.lastName}`
          // })
          console.log(`${member.firstName} ${member.lastName}`)
        } else {
          awayTeamMembers.forEach(awayMember => {
            if (awayMember.statsID === id) {
              // this.setState({
              //   single: `${member.firstName} ${member.lastName}`
              // })
              console.log(`${member.firstName} ${member.lastName}1`)
            }
          })
        }
      })
    }
  }
  getSuggestions(value: string) {
    const { game } = this.props
    if (!game) {
      return []
    }

    const inputValue = deburr(value.trim()).toLowerCase()
    const inputLength = inputValue.length

    const suggestions: Suggestion[] = []
    for (const member of this.props.homeTeamMembers) {
      // beginning of first/last name
      // TODO(Aurélien): use fuzzy finder here !
      const matches =
        member.firstName.slice(0, inputLength).toLowerCase() === inputValue ||
        member.lastName.slice(0, inputLength).toLowerCase() === inputValue
      if (!matches) {
        continue
      }

      suggestions.push({
        label: `${member.firstName} ${member.lastName}`,
        player: member,
        team: {
          id: game.teams.home.statsID,
          name: game.teams.home.name,
        },
        side: "home",
      })
    }
    for (const member of this.props.awayTeamMembers) {
      const matches =
        member.firstName.slice(0, inputLength).toLowerCase() === inputValue ||
        member.lastName.slice(0, inputLength).toLowerCase() === inputValue
      if (!matches) {
        continue
      }

      suggestions.push({
        label: `${member.firstName} ${member.lastName}`,
        player: member,
        team: {
          id: game.teams.away.statsID,
          name: game.teams.away.name,
        },
        side: "away",
      })
    }

    return suggestions
  }

  onSuggestionsFetchRequested = ({
    value,
  }: SuggestionsFetchRequestedParams) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    })
    console.log(this.props)
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    })
  }

  onSuggestionSelected = (
    _event: any,
    { suggestion }: SuggestionSelectedEventData<Suggestion>,
  ) => {
    const bet = { ...this.props.bet }
    bet.actor = {
      type: "player",
      id: suggestion.player.statsID,
    }
    if (this.props.updateTeamID) {
      // force-cast to add the teamID
      ;((bet as any) as WithTeamID).teamID = suggestion.team.id
    }
    this.props.onChangeBet(bet)
    console.log(suggestion);
    console.log(this.props)
  }

  handleChange = (event: any, { newValue }: ChangeEvent) => {
    this.setState({
      single: newValue,
    })
  }

  getSuggestionValue(suggestion: Suggestion): string {
    return suggestion.label
  }

  renderSuggestion = (
    suggestion: Suggestion,
    { isHighlighted }: RenderSuggestionParams,
  ) => {
    return (
      <MenuItem selected={isHighlighted} component="div">
        {suggestion.label} ({suggestion.team.name})
      </MenuItem>
    )
  }

  renderInputComponent = (inputProps: InputProps<Suggestion>) => {
    // validation
    const { bet, autoFocus } = this.props
    const error =
      bet.actor.type === "player"
        ? bet.actor.id > 0
          ? null
          : "Cannot be empty"
        : null

    const { classes, ref, inputRef, ...other } = inputProps
    return (
      <TextField
        fullWidth
        error={Boolean(error)}
        helperText={error}
        autoFocus={autoFocus}
        InputProps={{
          inputRef: node => {
            ref(node)
            if (inputRef) {
              inputRef(node)
            }
          },
          classes,
        }}
        {...other as any}
      />
    )
  }

  render() {
    const { classes } = this.props
    const { suggestions } = this.state
    console.log(this.props)
    return (
      <Autosuggest
        renderInputComponent={this.renderInputComponent}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={{
          classes,
          placeholder: "Search for a player by first/last name",
          value: this.state.single,
          onChange: this.handleChange,
        }}
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderSuggestionsContainer={options => (
          <Paper {...options.containerProps} square>
            {options.children}
          </Paper>
        )}
      />
    )
  }
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    container: {
      position: "relative",
    },
    suggestionsContainerOpen: {
      position: "absolute",
      zIndex: 1,
      marginTop: theme.spacing.unit,
      left: 0,
      right: 0,
    },
    suggestion: {
      display: "block",
    },
    suggestionsList: {
      margin: 0,
      padding: 0,
      listStyleType: "none",
    },
    divider: {
      height: theme.spacing.unit * 2,
    },
  })

export default withStyles(styles)(withTeamMembers(PlayerAutosuggest))
