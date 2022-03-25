import { Card as C, Typography, List, ListItem, Divider } from "@mui/material"

type Props = {
  title: string
  items: string[]
}

export const Card: React.FC<Props> = ({ title, items }) => (
  <C sx={{ padding: '1rem' }}>
    <Typography 
      variant="h5" 
      component="h2"
      sx={{
        '&::after': {
          content: '""',
          width: '3.2rem',
          height: '8px',
          bgcolor: 'primary.main',
          display: 'block',
          marginTop: '5px'
        }
      }}
    >
      {title}
    </Typography>
    <List>
      {items.map(item => (
        <>
        <ListItem>
          {item}
        </ListItem>
        <Divider />
        </>
      ))}
    </List>
  </C>
)