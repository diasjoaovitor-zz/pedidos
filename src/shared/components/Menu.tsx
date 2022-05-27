import { useState } from "react"
import { IconButton, Menu as MatMenu, MenuItem } from "@mui/material"
import { Lightbulb, Logout, Menu as MenuIcon } from "@mui/icons-material"
import { logout } from "../firebase"
import { useAppThemeContext } from "../contexts"

export const Menu: React.FC = () => {
  const { toggleTheme } = useAppThemeContext()

  const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
  }
   
  const handleClose = (): void => {
    setAnchorEl(null)
  }

  return (
    <>
    <IconButton
      aria-controls={open ? 'basic-menu' : undefined}
      sx={{ color: 'background.default' }}
      onClick={handleClick}
      role="menu"
    >
      <MenuIcon />
    </IconButton>
    <MatMenu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
      sx={{ 
        '& .MuiSvgIcon-root': {
          marginRight: 2
        }
      }}
    >
        <MenuItem onClick={toggleTheme} >
          <Lightbulb /> Mudar Tema
        </MenuItem>
        <MenuItem onClick={logout}>
          <Logout /> Logout
        </MenuItem>
    </MatMenu>
    </>
  )
}