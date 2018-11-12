import * as PropTypes from "prop-types"
import { Props as BetProps } from "./Bet"

export const BetWithStatus = PropTypes.shape({
  ...BetProps,
  status: PropTypes.oneOf([
    "not_started",
    "can_join",
    "joined",
    "missed",
    "won",
    "lost",
  ]).isRequired,
})
