import * as PropTypes from "prop-types"

export const LocationInfo = PropTypes.shape({
  name: PropTypes.string.isRequired,
  shortName: PropTypes.string.isRequired,
})
