import { Ballot } from "@mui/icons-material"
import { Container, FormControl, Toolbar, Typography } from "@mui/material"
import { FormEvent, ReactNode } from "react"
import { Link } from "react-router-dom"
import { Title } from "./Title"

type Props = {
  title: string
  to: string
  children: ReactNode
  handleSubmit(e: FormEvent<HTMLElement>): Promise<void>
}

export const Auth: React.FC<Props> = ({ children, title, to, handleSubmit }) => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: 4,
        '& .MuiOutlinedInput-root': {
          marginBottom: 1,
          '& fieldset': {
            borderColor: 'gray'
          }
        },
        '& a': {
          textDecoration: 'none',
          color: 'inherit',
          fontSize: 12
        } 
      }}
    >
      <Toolbar component="header" sx={{ padding: 0 }}>
        <Ballot color="primary" sx={{ marginRight: '2px', fontSize: 32 }} />
        <Typography variant="h6" component="h1">
          Pedidos
        </Typography>    
      </Toolbar>
      <FormControl 
        component="form" role="form" fullWidth
        sx={{ 
          backgroundColor: 'background.paper', 
          padding: 3,
          borderRadius: 2,
          maxWidth: "sm"
        }}
        onSubmit={handleSubmit}
      >
        <Title component="h2">
          {title}
        </Title>
        {children}
      </FormControl>
      <Typography component="p">
        <Link to={to}>
          {to === '/register' ? 'Não tem uma conta? Cadastre-se!' : 'Já tenho uma conta'}
        </Link>
      </Typography>
    </Container>
  )
}
