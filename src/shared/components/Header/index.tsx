import React from "react"
import { Container, Toolbar, Typography } from "@mui/material"
import { useLocation } from "react-router-dom"
import { GoBack } from "./GoBack"
import { ToggleTheme } from "./ToggleTheme"
import { margin } from "@mui/system"

export const Header: React.FC<{ title: string }> = ({ title }) => {
  const { pathname } = useLocation()

  return (
    <Toolbar sx={{ 
      bgcolor: 'primary.main', 
      color: 'black',
      justifyContent: 'space-between',
      padding: '0'
    }}>
      <Container>
        <Typography variant="h6" component="h1">
          {title}
        </Typography>
      </Container>
      {pathname !== '/' ? <GoBack /> : <ToggleTheme />}
    </Toolbar> 
  )
}
