import * as PropTypes from "prop-types"

export const Profile = PropTypes.shape({
  displayName: PropTypes.string.isRequired,
  photoURL: PropTypes.string,
})
