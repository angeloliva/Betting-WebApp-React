import * as PropTypes from "prop-types"

export const Props = {
  description: PropTypes.string.isRequired,
  isTriggeredOut: PropTypes.bool.isRequired,
  isResolved: PropTypes.bool.isRequired,
  isSuccess: PropTypes.bool,
  odds: PropTypes.number.isRequired,
}

export const Bet = PropTypes.shape(Props)
