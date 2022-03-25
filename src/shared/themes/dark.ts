import { createTheme } from "@mui/material"

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffb300' 
    },
    background: {
      default: '#212121',
      paper: '#424242'
    }
  },
})
