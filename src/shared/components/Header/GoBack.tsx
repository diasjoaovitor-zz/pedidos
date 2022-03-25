import { Link } from "react-router-dom"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from "@mui/material";

export const GoBack: React.FC = () => (
  <Link to="/">
    <IconButton sx={{ color: 'background.default' }} >
      <ArrowBackIcon/>
    </IconButton>
  </Link>
)
