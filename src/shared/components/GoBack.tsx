import { ArrowBack } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { useNavigate } from "react-router-dom"

type Props = {
  handleClick?:() => void
}

export const GoBack: React.FC<Props> = ({ handleClick }) => {
  const navigate = useNavigate()

  return (
    <IconButton 
      role="link" sx={{ color: 'background.default' }} 
      onClick={() => {
        handleClick && handleClick()
        navigate(-1)
      }}
    >
      <ArrowBack />
    </IconButton>
  )
}
