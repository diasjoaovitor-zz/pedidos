import { Backdrop, CircularProgress } from "@mui/material"
import { useAppThemeContext } from "../contexts"

export const Loader: React.FC<{ open: boolean }> = ({ open }) => {
  const { theme } = useAppThemeContext()
  return (
    <Backdrop
      sx={{ 
        color: theme.palette.secondary.dark, 
        zIndex: theme => theme.zIndex.drawer + 1 
      }}
      open={open}
    >
      <CircularProgress />
    </Backdrop>
  )
}
