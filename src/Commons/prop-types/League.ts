import * as PropTypes from "prop-types"
import { Sport } from "./Sport"

export const League = PropTypes.shape({
  sport: Sport,
  name: PropTypes.string.isRequired,
  shortName: PropTypes.string.isRequired,
  longName: PropTypes.string.isRequired,
})
