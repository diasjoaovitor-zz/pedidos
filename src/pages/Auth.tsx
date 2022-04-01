import { Facebook, Mail } from "@mui/icons-material"
import { Box, Button, Card, Container, Toolbar } from "@mui/material"
import { Title } from "../shared/components"

export const Auth: React.FC = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: 4
      }}
    >
      <Card sx={{ width: '100%', padding: 3 }}>
        <Toolbar component="header" sx={{ padding: 0 }}>
          <Title component="h1">
            Login
          </Title>
        </Toolbar>
        <Box component="form">
          <Button
            variant="contained" startIcon={<Facebook />} fullWidth
            sx={{
              justifyContent: 'flex-start',
              marginBottom: 1,
              backgroundColor: '#446EAF',
              color: 'CaptionText'
            }}
          >
            Entrar com o Facebook
          </Button>
          <Button variant="contained" startIcon={<Mail />} fullWidth
            sx={{ 
              justifyContent: 'flex-start', 
              backgroundColor: '#CA3D25' ,
              color: 'CaptionText'
            }}
          >
            Entrar com o Gmail
          </Button>
        </Box>
      </Card>
    </Container>
  )
}
