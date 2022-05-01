import { ArrowBack } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { Link } from "react-router-dom"

export const GoBack: React.FC<{ to?: string }> = ({ to }) => (
  <Link to={to || '/'}>
    <IconButton sx={{ color: 'background.default' }} >
      <ArrowBack />
    </IconButton>
  </Link>
)
