import { IconButton, MenuItem, Menu as MatMenu } from "@mui/material"
import { Menu as MenuIcon } from "@mui/icons-material"
import { useState } from "react"

type Props = {
  handleLogout(): Promise<void>
}

export const Menu: React.FC<Props> = ({ handleLogout }) => {
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
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      sx={{ color: 'background.default' }}
      onClick={handleClick}
      role="navigation"
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