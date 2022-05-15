import { Lightbulb } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { useAppThemeContext } from "../contexts"

export const ToggleTheme: React.FC = () => {
  const { toggleTheme } = useAppThemeContext()

  return (
    <IconButton onClick={toggleTheme} sx={{ color: 'background.default' }}>
      <Lightbulb />
    </IconButton>
  )
}
