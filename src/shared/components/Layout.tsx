import { Container, IconButton, TextField } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { ReactNode } from "react"
import { Link } from "react-router-dom"
import { Header } from "./Header"

type Props = {
  title: string
  children: ReactNode
  autoFocus?: boolean
  handleFocus?: () => void
}

export const Layout: React.FC<Props> = ({ title, children, autoFocus, handleFocus }) => {
  return (
    <>
      <Header title={title} />
      <Container sx={{ 
        backgroundColor: 'background.default', 
        textAlign: 'right'
      }}>
        <TextField 
          label="Digite sua busca..." 
          variant="outlined" 
          sx={{
            width: "100%",
            marginTop: 2
          }}
          autoFocus={autoFocus}
          onFocus={handleFocus}
        />
        {children}
        <Link to="product/create" style={{
          position: 'sticky',
          bottom: '16px',
        }}>
          <IconButton sx={{ 
            padding: 0,
            color: 'primary.main'
          }}>
            <AddCircleIcon sx={{
              fontSize: '3rem',
            }} />
          </IconButton>
        </Link>
      </Container>
    </>
  )
}
  