import { createContext, useCallback, useContext, useMemo, useState } from "react"
import { ThemeProvider } from '@emotion/react'
import { Box } from "@mui/material"
import CssBaseline from '@mui/material/CssBaseline'
import { darkTheme, lightTheme } from "../themes"

type Theme = 'light' | 'dark' 

interface IThemeContextData {
  themeName: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext({} as IThemeContextData)

export const useAppThemeContext = () => useContext(ThemeContext)

export const AppThemeProvider: React.FC = ({ children }) => {
  const [ themeName, setTheme ] = useState<Theme>('dark')

  const toggleTheme = useCallback(() => {
    setTheme(theme => theme === 'dark' ? 'light' : 'dark')
  }, [])

  const theme = useMemo(() => {
    return themeName === 'dark' ? darkTheme : lightTheme
  }, [themeName])

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}>
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
