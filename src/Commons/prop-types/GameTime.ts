import * as PropTypes from "prop-types"

export const GameTime = PropTypes.shape({
  period: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
})
