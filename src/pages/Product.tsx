import { Button, Container, TextField, Box } from "@mui/material"
import { ChangeEvent, FormEvent, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Header, Loader } from "../shared/components"
import { TAvailability, TProduct, TProductService } from "../shared/types"
import { useAppThemeContext, useAuthContext, useProductContext } from "../shared/contexts"
import { allFieldsAreFilled, getElementValues, handleFocus, removeEmptyFields, removeExcessAvailabilityFields } from "../shared/functions"
import { GoBack } from "../shared/components/GoBack"

type Props = {
  create: TProductService
  update: TProductService
}

export const Product: React.FC<Props> = ({ create, update }) => {
  const { theme } = useAppThemeContext()
  const { setUpdateData, productContext } = useProductContext()
  const { user } = useAuthContext()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const method = pathname.split('/')[2]
  const state = method === 'create' ? {
    title: 'Adicionar',
    buttonTitle: 'Adicionar',
    submit: async (product: TProduct) => create(product)
  } : {
    title: 'Editar',
    buttonTitle: 'Salvar',
    submit: async (product: TProduct) => update(product)
  }
  const product = { ...productContext, availability: [
    ...productContext.availability, { brand: '', price: 0, company: '' }
  ]}
  const [ availability, setAvailability ] = useState(product.availability)
  const [ loader, setLoader ] = useState(false)
  
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number): void => {
    const av = [ ...availability ]
    av[index] = { ...av[index], [ e.target.name ]: e.target.value }
    setAvailabilityFields(av, allFieldsAreFilled(av))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const [ name, description, ] = getElementValues(e, ['name', 'description'])
    const data = { 
      ref: user?.uid, 
      name, 
      description, 
      availability: removeEmptyFields(availability) 
    }
    setLoader(true)
    try {
      await state.submit(data)
      setUpdateData(true)
      navigate('/')
    } catch (error) {
      setLoader(false)
      alert('Erro ao submeter formulário')
    }
  }

  return (
    <>
    <Header title={state.title}>
      <GoBack />
    </Header>
    <Box 
      component="form"
      flex={1}
      sx={{
        backgroundColor: theme.palette.background.paper,
        paddingX: 2,
        paddingY: 4,
        '& .MuiTextField-root': {
          marginBottom: 4,
        },
        '& .availability': {
          display: 'flex',
          overflowX: 'auto'
        }
      }}
      onSubmit={handleSubmit}
    >
      <Container>
        <Box component="section">
          <TextField 
            name="name"
            label="Produto" 
            variant="outlined" 
            fullWidth
            required
            defaultValue={product.name}
            onFocus={handleFocus}
          />
          <TextField 
            name="description"
            label="Descrição" 
            variant="outlined" 
            fullWidth
            defaultValue={product.description}
          />
        </Box>
        <div className="availability">
          {availability.map(({ brand, company, price }, i) => {
            const required = i === 0
            return (
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
                  required={required}
                  onFocus={handleFocus}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, i)}
                />
                <TextField 
                  label="Valor" 
                  type="number"
                  variant="outlined" 
                  fullWidth
                  defaultValue={price > 0 ? price : ''}
                  inputProps={{ step: 'any', min: '0' }}
                  name="price"
                  required={required}
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
                  required={required}
                  onFocus={handleFocus}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, i)}
                />
              </Box>
            )
          })}
        </div>
        <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 4 }}>
          {state.buttonTitle}
        </Button>
      </Container>
    </Box>
    {loader && <Loader />}
    </>
  )
}