import { createTheme } from "@mui/material"

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffb300' 
    },
    secondary: {
      main: '#383838',
      dark: '#212121dd',
      light: '#ffffff1f'
    },
    background: {
      default: '#212121',
      paper: '#424242'
    },
  },
})
