import * as PropTypes from "prop-types"
import { GameTime } from "./GameTime"

export const GameTimeOrPre = PropTypes.oneOf(["pre", GameTime])
