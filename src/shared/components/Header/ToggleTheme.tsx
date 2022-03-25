import LightbulbIcon from '@mui/icons-material/Lightbulb'
import { IconButton } from '@mui/material'
import { useAppThemeContext } from '../../contexts'

export const ToggleTheme: React.FC = () => {
  const { toggleTheme } = useAppThemeContext()

  return (
    <IconButton onClick={toggleTheme} sx={{ color: 'background.default' }}>
      <LightbulbIcon />
    </IconButton>
  )
}
  