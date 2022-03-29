import { useLocation } from "react-router-dom"
import { Container, Toolbar, Typography } from "@mui/material"
import { GoBack } from "./GoBack"
import { ToggleTheme } from "./ToggleTheme"

export const Header: React.FC<{ title: string }> = ({ title }) => {
  const { pathname } = useLocation()

  return (
    <Toolbar 
      component="header"
      sx={{ 
        bgcolor: 'primary.main', 
        color: 'black',
        justifyContent: 'space-between',
        padding: '0'
      }}
    >
      <Container sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Typography variant="h6" component="h1">
          {title}
        </Typography>
        {pathname !== '/' ? <GoBack /> : <ToggleTheme />}
      </Container>
    </Toolbar> 
  )
}
