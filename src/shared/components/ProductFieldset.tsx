import { Box, TextField } from "@mui/material"
import { ChangeEvent } from "react"
import { handleFocus } from "../functions"
import { TAvailability } from "../types"

type Props = {
  availability: TAvailability
  required: boolean
  handleChange(e: ChangeEvent<HTMLInputElement>): void
}

export const ProductFieldset: React.FC<Props> = ({ availability, required, handleChange }) => (
  <Box
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
      defaultValue={availability.brand}
      name="brand"
      required={required}
      onFocus={handleFocus}
      onChange={handleChange}
    />
    <TextField 
      label="Valor" 
      type="number"
      variant="outlined" 
      fullWidth
      defaultValue={availability.price > 0 ? availability.price : ''}
      inputProps={{ step: 'any', min: '0' }}
      name="price"
      required={required}
      onFocus={handleFocus}
      onChange={handleChange}
    />
    <TextField 
      label="Empresa" 
      variant="outlined" 
      fullWidth
      sx={{ margin: '0 !important' }}
      defaultValue={availability.company}
      name="company"
      required={required}
      onFocus={handleFocus}
      onChange={handleChange}
    />
  </Box>
)