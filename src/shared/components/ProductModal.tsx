import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Card, Divider, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { TProductPresentation } from "../types";
import { useAppThemeContext } from "../contexts";
import { Title } from "./";

type Props = {
  product: TProductPresentation
  closeModal(): void
  handleUpdate(id: string): void
}

export const ProductModal: React.FC<Props> = ({ product, closeModal, handleUpdate }) => {
  const { theme } = useAppThemeContext()
 
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.secondary.dark,
        zIndex: 1,
        padding: 4
      }}
    >
      <Card component="form" sx={{ width: '100%', padding: 2 }}>
        <Toolbar 
          component="header" 
          sx={{ 
            justifyContent: 'space-between', 
            paddingX: 0,
            '& button': {
              padding: 0
            }
          }}
        >
          <Title component="h2">
            Detalhes
          </Title>
          <IconButton 
            sx={{ 
              color: 'text.main' 
            }} 
            onClick={closeModal}
          >
            <ArrowBackIcon/>
          </IconButton>
        </Toolbar>
        <Box sx={{ border: 1, borderColor: theme.palette.secondary.light }}>
            <Stack direction="row" justifyContent="space-between" padding={1}>
              <Box textAlign="left">
                <Typography variant="caption" component="span">
                  Produto
                </Typography>
                <Typography variant="inherit" component="p">
                  {product.name}
                </Typography>
              </Box>
              <Box>
              <Typography variant="caption" component="span">
                  Marca
                </Typography>
                <Typography variant="inherit" component="p">
                  {product.brand}
                </Typography>
              </Box>
            </Stack>
            <Divider />
            <Stack direction="row" justifyContent="space-between" padding={1}>
              <Box textAlign="left">
                <Typography variant="caption" component="span">
                  Descrição
                </Typography>
                <Typography variant="inherit" component="p">
                  {product.description}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" component="span">
                  Valor
                </Typography>
                <Typography variant="inherit" component="p">
                  {product.price}
                </Typography>
              </Box>
            </Stack>
        </Box>
        <Stack direction="row" gap={1} marginTop={2}>
          <Button variant="contained" fullWidth onClick={() => handleUpdate(product.id)}>
            Editar
          </Button>
          <Button variant="contained" color="error" fullWidth>
            Excluir
          </Button>
        </Stack>
      </Card>
    </Box>
  )
}
