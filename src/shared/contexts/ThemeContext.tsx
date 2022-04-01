import { createContext, useCallback, useContext, useMemo, useState } from "react"
import { ThemeProvider } from '@emotion/react'
import { Theme } from '@mui/material'
import { Box } from "@mui/material"
import CssBaseline from '@mui/material/CssBaseline'
import { darkTheme, lightTheme } from "../themes"

type TThemeContext = {
  toggleTheme: () => void
  theme: Theme
}

const ThemeContext = createContext({} as TThemeContext)

export const useAppThemeContext = () => useContext(ThemeContext)

export const AppThemeProvider: React.FC = ({ children }) => {
  const [ themeName, setThemeName ] = useState<'light' | 'dark'>('dark')

  const toggleTheme = useCallback(() => {
    setThemeName(theme => theme === 'dark' ? 'light' : 'dark')
  }, [])

  const theme = useMemo(() => {
    return themeName === 'dark' ? darkTheme : lightTheme
  }, [themeName])

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box 
          width="100vw" 
          height="100vh" 
          display='flex' 
          flexDirection='column' 
          bgcolor={theme.palette.background.default}
        >
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
