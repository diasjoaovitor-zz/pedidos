import { FormEvent, useEffect, useState } from 'react'
import { Card, Chip as C, FormLabel, Stack } from '@mui/material'
import { InputUnstyled } from '@mui/base'

type Props = {
  chips: string[]
  handleDelete(index: number): void
  handleSubmit(e: FormEvent): void
}

export const Chip: React.FC<Props> = ({ chips, handleDelete, handleSubmit }) => {
  const [ focus, setFocus ] = useState(false)
  const [ color, setColor ] = useState('#fff')

  useEffect(() => {
    setColor(!focus ? 'inherit' : 'primary.main')
  }, [focus])

  return (
    <Card 
      component="form" 
      sx={{ 
        backgroundColor: 'secondary.main', 
        padding: 1, 
        marginTop: 1, 
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottom: 1,
        borderColor: color,
        textAlign: 'left',
        '& .MuiInput-root': {
          width: '100%',
          flex: 1
        },
        '& .MuiInput-input': {
          backgroundColor: '#fff0',
          border: 'none',
          outline: 'none',
          color: '#fff',
          width: '100%',
          minWidth: '160px'
        } 
      }}
      onSubmit={handleSubmit}
    >
      <FormLabel sx={{ color, fontSize: 12 }}>Filtros</FormLabel>
      <Stack direction="row" alignItems="center" flexWrap="wrap">
        {chips.map((chip, i) => (
          <C key={i} label={chip} sx={{ display: 'flex', margin: .5 }} onDelete={() => handleDelete(i)} />
        ))}
        <InputUnstyled 
          name="chip"
          placeholder='Adicionar novo filtro...'
          onFocus={() => setFocus(true)}  
          onBlur={() => setFocus(false)}  
        />
      </Stack>
    </Card>
  )
}
  