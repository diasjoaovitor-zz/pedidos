import { Link, useLocation } from "react-router-dom"
import { Container, IconButton, Toolbar, Typography } from "@mui/material"
import { useAppThemeContext } from "../contexts"
import { Lightbulb, ArrowBack } from "@mui/icons-material"

const ToggleTheme: React.FC = () => {
  const { toggleTheme } = useAppThemeContext()

  return (
    <IconButton onClick={toggleTheme} sx={{ color: 'background.default' }}>
      <Lightbulb />
    </IconButton>
  )
}

const GoBack: React.FC = () => (
  <Link to="/">
    <IconButton sx={{ color: 'background.default' }} >
      <ArrowBack />
    </IconButton>
  </Link>
)

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
