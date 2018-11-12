import * as PropTypes from "prop-types"
import { LocationInfo } from "./LocationInfo"

export const Venue = PropTypes.shape({
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: LocationInfo,
  country: LocationInfo.isRequired,
})
