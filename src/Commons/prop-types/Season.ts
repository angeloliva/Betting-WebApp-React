import * as PropTypes from "prop-types"
import { SeasonType } from "./SeasonType"

export const Season = PropTypes.shape({
  year: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  type: SeasonType.isRequired,
})
