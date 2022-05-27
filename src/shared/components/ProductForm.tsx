import { FormEvent, ReactNode } from "react"
import { Box, Button, Card, Container, TextField } from "@mui/material"
import { handleFocus } from "../functions"

type Props = {
  name: string
  description: string
  buttonTitle: string
  children: ReactNode
  handleSubmit(e: FormEvent<HTMLElement>): Promise<void>
}
export const ProductForm: React.FC<Props> = ({ name, description, buttonTitle, children, handleSubmit }) => (
  <Card 
    component="form"
    sx={{
      paddingX: 2,
      paddingY: 4,
      height: "100vh",
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
            defaultValue={name}
            onFocus={handleFocus}
          />
          <TextField 
            name="description"
            label="Descrição" 
            variant="outlined" 
            fullWidth
            defaultValue={description}
          />
        </Box>
        <div className="availability">
          {children}
        </div>
        <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 4 }}>
          {buttonTitle}
        </Button>
      </Container>
    </Card>
)