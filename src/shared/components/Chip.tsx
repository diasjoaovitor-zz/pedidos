import { FormEvent, useEffect, useState } from 'react';
import { Card, Chip as C, FormLabel, Stack } from '@mui/material'
import { InputUnstyled } from '@mui/base';

type Props = {
  chips: string[]
  handleDelete(index: number): void
  handleSubmit(e: FormEvent): void
}

export const Chip: React.FC<Props> = ({ chips, handleDelete, handleSubmit }) => {
  const [ focus, setFocus ] = useState(false)
  const [ color, setColor ] = useState('#fff')

  useEffect(() => {
    setColor(!focus ? '#fff' : 'primary.main')
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
        '& input': {
          backgroundColor: '#fff0',
          border: 'none',
          outline: 'none',
          color: '#fff' 
        } 
      }}
      onSubmit={handleSubmit}
    >
      <FormLabel sx={{ color, fontSize: 12 }}>Filtros</FormLabel>
      <Stack direction="row" alignItems="center" flexWrap="wrap">
        {chips.map((chip, i) => (
          <C key={i} label={chip} sx={{ margin: .5 }} onDelete={() => handleDelete(i)} />
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
  