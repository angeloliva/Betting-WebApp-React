import * as React from "react"
import CircularProgress from "@material-ui/core/CircularProgress"

export interface Props {
  size: string | number
  color?: "primary" | "secondary" | "inherit"
}

const Spinner = ({ size, color = "primary" }: Props) => (
  <CircularProgress size={size || 60} color={color} />
)

export default Spinner
