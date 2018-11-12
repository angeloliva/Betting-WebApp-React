import * as PropTypes from "prop-types"

export const Score = PropTypes.shape({
  home: PropTypes.number.isRequired,
  away: PropTypes.number.isRequired,
})
