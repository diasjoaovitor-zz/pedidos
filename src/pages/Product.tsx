import { Button, TextField } from "@mui/material"
import {  Box } from "@mui/system"
import { ChangeEvent, FocusEvent, useState } from "react"
import { useLocation } from "react-router-dom"
import { Header } from "../shared/components"
import { TAvailability, TProduct } from "../shared/types"
import { useAppThemeContext, useProductContext } from "../shared/contexts"
import { allFieldsAreFilled, removeExcessAvailabilityFields } from "../shared/functions/dynamic-fields"

export const Product: React.FC = () => {
  const { theme } = useAppThemeContext()
  const { productContext } = useProductContext()
  const { pathname } = useLocation()
  const method = pathname.split('/')[2]
  const state = method === 'create' ? {
    to: '/',
    title: 'Adicionar',
    buttonTitle: 'Adicionar'
  } : {
    to: '/search',
    title: 'Editar',
    buttonTitle: 'Salvar'
  }
  const product = { ...productContext, availability: [
    ...productContext.availability, { brand: '', price: 0, company: '' }
  ]}
  const [ availability, setAvailability ] = useState<TAvailability>(product.availability)

  const setAvailabilityFields = (availability: TAvailability, allFieldsAreFilled: boolean): void => {
    if(!allFieldsAreFilled) {
      availability = removeExcessAvailabilityFields(availability)
      setAvailability(availability)
    } else {
      setAvailability([ ...availability, {
        brand: '',
        price: 0,
        company: ''
      }])
    }
  }

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => e.target.select()

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number): void => {
    const av = [ ...availability ]
    av[index] = { ...av[index], [ e.target.name ]: e.target.value }
    setAvailabilityFields(av, allFieldsAreFilled(av))
  }

  return (
    <>
    <Header title={state.title} to={state.to} />
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
        onFocus={handleFocus}
      />
      <TextField 
        label="Descrição" 
        variant="outlined" 
        fullWidth
        defaultValue={product.description}
      />
      </Box>
      <div>
        {availability.map(({ brand, company, price }, i) => (
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
              name="brand"
              onFocus={handleFocus}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, i)}
            />
            <TextField 
              label="Valor" 
              type="number"
              variant="outlined" 
              fullWidth
              defaultValue={price > 0 ? price : ''}
              name="price"
              onFocus={handleFocus}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, i)}
            />
            <TextField 
              label="Empresa" 
              variant="outlined" 
              fullWidth
              sx={{ margin: '0 !important' }}
              defaultValue={company}
              name="company"
              onFocus={handleFocus}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, i)}
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