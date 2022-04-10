import { IconButton, MenuItem, Menu as MatMenu } from "@mui/material"
import { Menu as MenuIcon } from "@mui/icons-material"
import { useState } from "react"
import { authConfig } from "../environment/firebase-config"

export const Menu: React.FC = () => {
  const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
  } 
  const handleClose = (): void => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    try {
      await authConfig.signOut()
    } catch (error) {
      alert('Algo deu errado')
      console.log(error)
    }
  }

  return (
    <>
    <IconButton
      aria-controls={open ? 'basic-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      sx={{ color: 'background.default' }}
      onClick={handleClick}
    >
      <MenuIcon />
    </IconButton>
    <MatMenu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </MatMenu>
    </>
  )
}