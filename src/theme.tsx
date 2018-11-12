import * as React from "react"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"

export const drawerWidth = 240

export const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Roboto",
      "-apple-system",
      '"Helvetica Neue"',
      "BlinkMacSystemFont",
      "Arial",
      "sans-serif",
    ].join(","),
  },
  palette: {
    primary: {
      main: "#6ad60b",
      contrastText: "#fff",
    },
  },
})

export interface Props {
  children: React.ReactNode
}

export const Provider = ({ children }: Props) => (
  <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
)
