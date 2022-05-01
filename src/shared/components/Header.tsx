import { useLocation } from "react-router-dom"
import { Container, Toolbar, Typography } from "@mui/material"
import { Menu } from "./Menu"
import { ToggleTheme } from "./ToggleTheme"
import { GoBack } from "./GoBack"

export const Header: React.FC<{ title: string, to?: string }> = ({ title, to }) => {
  const { pathname } = useLocation()

  return (
    <Toolbar 
      component="header"
      sx={{ 
        bgcolor: 'primary.main', 
        color: 'black',
        justifyContent: 'space-between',
        padding: '0 !important'
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
        {pathname !== '/' ? 
          <GoBack to={to} /> :
          <Toolbar sx={{ padding: 0 }}>
            <ToggleTheme />
            <Menu />
          </Toolbar>
        }
      </Container>
    </Toolbar> 
  )
}
