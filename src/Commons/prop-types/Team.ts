import * as PropTypes from "prop-types"

export const Team = PropTypes.shape({
  location: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  shortName: PropTypes.string.isRequired,
})
