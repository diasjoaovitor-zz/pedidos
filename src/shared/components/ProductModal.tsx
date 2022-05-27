import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box,  DialogContent, Divider, IconButton, Stack, Toolbar, Typography } from "@mui/material"
import { TProductPresentation } from "../types"
import { Title } from "."

import { Button, Dialog, DialogActions, useMediaQuery, useTheme } from "@mui/material"
import { formatCurrency } from '../functions'

type Props = {
  product: TProductPresentation
  handleClose(): void
  handleUpdate(): void
  handleDelete(): void
}

export const ProductModal: React.FC<Props> = ({ product, handleClose, handleUpdate, handleDelete }) => {
  const open = Boolean(product)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      >
        <DialogContent sx={{ padding: 2 }}>
          <Toolbar 
            component="header" 
            sx={{ 
              justifyContent: 'space-between', 
              paddingX: '0 !important',
              '& button': {
                padding: 0
              }
            }}
          >
            <Title component="h2">
              Detalhes
            </Title>
            <IconButton sx={{ color: 'text.main' }} onClick={handleClose}>
              <ArrowBackIcon />
            </IconButton>
          </Toolbar>
          <Box sx={{ border: 1, borderColor: 'gray' }}>
              <Stack direction="row" justifyContent="space-between" padding={1}>
                <Box marginRight={2}>
                  <Typography variant="caption" component="span">
                    Produto
                  </Typography>
                  <Typography variant="inherit" component="p">
                    {product.name}
                  </Typography>
                </Box>
                <Box textAlign="right">
                  <Typography variant="caption" component="span">
                    Marca
                  </Typography>
                  <Typography variant="inherit" component="p">
                    {product.brand}
                  </Typography>
                </Box>
              </Stack>
              <Divider sx={{ backgroundColor: 'gray' }} />
              <Stack direction="row" justifyContent="space-between" padding={1}>
                <Box>
                  <Typography variant="caption" component="span">
                    Descrição
                  </Typography>
                  <Typography variant="inherit" component="p">
                    {product.description}
                  </Typography>
                </Box>
                <Box textAlign="right">
                  <Typography variant="caption" component="span">
                    Valor
                  </Typography>
                  <Typography variant="inherit" component="p">
                    {formatCurrency(product.price)}
                  </Typography>
                </Box>
              </Stack>
          </Box>
        </DialogContent>
        <DialogActions sx={{ paddingX: 2 }}>
          <Button variant="contained" fullWidth onClick={handleUpdate}>Editar</Button>
          <Button variant="contained" color="error" fullWidth onClick={handleDelete}>Excluir</Button>
        </DialogActions>
      </Dialog>
  )
}
