import { ArrowBack } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"

export const GoBack: React.FC = () => {
  const navigate = useNavigate()

  return (
    <IconButton role="link" sx={{ color: 'background.default' }} onClick={() => navigate(-1)}>
      <ArrowBack />
    </IconButton>
  )
}
