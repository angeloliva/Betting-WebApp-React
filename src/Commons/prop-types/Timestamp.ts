import * as PropTypes from "prop-types"
import { Timestamp as FirestoreTimestamp } from "../../firebase"

export const Timestamp = PropTypes.instanceOf(FirestoreTimestamp)
