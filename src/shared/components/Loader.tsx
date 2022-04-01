import { Box, CircularProgress } from "@mui/material";
import { useAppThemeContext } from "../contexts";

export const Loader: React.FC = () => {
  const { theme } = useAppThemeContext()
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 1,
        backgroundColor:  theme.palette.secondary.dark
  
      }}
    >
      <CircularProgress />
    </Box>
  )
}
