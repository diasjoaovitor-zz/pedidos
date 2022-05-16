import { ArrowBack } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"

export const GoBack: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Link to="/" onClick={() => navigate(-1)}>
      <IconButton sx={{ color: 'background.default' }} >
        <ArrowBack />
      </IconButton>
    </Link>
  )
}
