import React from "react"
import { Toolbar, Typography } from "@mui/material"
import { useLocation } from "react-router-dom"
import { GoBack } from "./GoBack"
import { ToggleTheme } from "./ToggleTheme"

export const Header: React.FC<{ title: string }> = ({ title }) => {
  const { pathname } = useLocation()

  return (
    <Toolbar sx={{ 
      bgcolor: 'primary.main', 
      color: 'black',
      justifyContent: 'space-between' 
    }}>
      <Typography variant="h6" component="h1">
        {title}
      </Typography>
      {pathname !== '/' ? <GoBack /> : <ToggleTheme />}
    </Toolbar> 
  )
}
