import { Container, IconButton, TextField } from "@mui/material"
import { AddCircle } from '@mui/icons-material';
import { ReactNode } from "react"
import { Link } from "react-router-dom"
import { Header } from "./Header"
import { useProductContext } from "../contexts"
import { TProductPresentation } from "../types"
import { productState } from "../states";

type Props = {
  title: string
  children: ReactNode
  autoFocus?: boolean
  handleFocus?: () => void
}

export const Layout: React.FC<Props> = ({ title, children, autoFocus, handleFocus }) => {
  const { setProductContext, setProductPresentationContext } = useProductContext()

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
        <Link 
          to="product/create" 
          style={{
            position: 'sticky',
            bottom: '16px',
          }}
          onClick={() => {
            setProductContext(productState)
            setProductPresentationContext({} as TProductPresentation)
          }}
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
    </>
  )
}
  