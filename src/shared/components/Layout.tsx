import { useNavigate } from "react-router-dom"
import { Container, IconButton, TextField } from "@mui/material"
import { AddCircle } from '@mui/icons-material'
import { ChangeEvent, ReactNode } from "react"
import { Link } from "react-router-dom"
import { useProductContext } from "../contexts"
import { TProductPresentation } from "../types"
import { productState } from "../states"

type Props = {
  children: ReactNode
  autoFocus?: boolean
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Layout: React.FC<Props> = ({ children, autoFocus, handleChange }) => {
  const navigate = useNavigate()
  const { setProductContext, setProductPresentationContext } = useProductContext()

  return (
    <Container sx={{ 
      backgroundColor: 'background.default', 
      textAlign: 'right'
    }}>
      <TextField 
        label="Digite sua busca..." 
        variant="outlined" 
        type="search"
        sx={{
          width: "100%",
          marginTop: 2
        }}
        autoFocus={autoFocus}
        onFocus={() => !autoFocus && navigate('/search')}
        onChange={handleChange}
      />
      {children}
      <Link 
        to="/product/create" 
        style={{
          position: 'sticky',
          bottom: '16px',
        }}
        onClick={() => {
          setProductContext(productState)
          setProductPresentationContext({} as TProductPresentation)
        }}
        role="insertion"
      >
        <IconButton sx={{ 
          padding: 0,
          color: 'primary.main'
        }}>
          <AddCircle sx={{
            fontSize: '3rem',
          }} />
        </IconButton>
      </Link>
    </Container>
  )
}
  