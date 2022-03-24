import { Link } from "react-router-dom"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const GoBack: React.FC = () => (
  <Link to="/">
    <ArrowBackIcon />
  </Link>
)