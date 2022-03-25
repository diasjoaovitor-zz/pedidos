import { Button, TextField } from "@mui/material"
import {  Box } from "@mui/system"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import { Header } from "../shared/components"
import { Product as P } from "../shared/types/product"
import { productState } from "../shared/states/product-state"
import { useAppThemeContext } from "../shared/contexts"

export const Product: React.FC = () => {
  const { theme } = useAppThemeContext()
  const { pathname } = useLocation()
  const method = pathname.split('/')[2]
  const state = method === 'create' ? {
    title: 'Adicionar',
    buttonTitle: 'Adicionar'
  } : {
    title: 'Editar',
    buttonTitle: 'Salvar'
  }
  
  const [ product, setProduct ] = useState<P>(productState)

  return (
    <>
    <Header title={state.title} />
    <Box 
      component="form"
      flex={1}
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderRadius: 1,
        paddingX: 2,
        paddingY: 4,
        '& .MuiTextField-root': {
          marginBottom: 4,
        },
        '& > div': {
          display: 'flex',
          overflowX: 'auto'
        }
      }}
    >
      <Box component="section">
      <TextField 
        label="Produto" 
        id="outlined-basic"
        variant="outlined" 
        fullWidth
        defaultValue={product.name}
      />
      <TextField 
        label="Descrição" 
        variant="outlined" 
        fullWidth
        defaultValue={product.description}
      />
      </Box>
      <div>
        {product.availability.map(({ brand, company, price }, i) => (
          <Box 
            key={i} 
            component="fieldset" 
            borderRadius={1}
            padding={2}
            marginRight={2}
            sx={{ 
              minWidth: '85%',
              '&:last-of-type': {
                marginRight: 0
              } 
            }}
          >
            <TextField 
              label="Marca" 
              variant="outlined" 
              fullWidth
              defaultValue={brand}
            />
            <TextField 
              label="Valor" 
              type="number"
              variant="outlined" 
              fullWidth
              defaultValue={price}
            />
             <TextField 
              label="Empresa" 
              variant="outlined" 
              fullWidth
              sx={{ margin: '0 !important' }}
              defaultValue={company}
            />
          </Box>
        ))}
      </div>
      <Button variant="contained" fullWidth sx={{ marginTop: 4 }}>
        {state.buttonTitle}
      </Button>
    </Box>
    </>
  )
}