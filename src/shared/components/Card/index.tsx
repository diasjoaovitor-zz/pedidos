import { Card as C, Typography, List, ListItem, Divider } from "@mui/material"

type Props = {
  title: string
  items: string[]
}

export const Card: React.FC<Props> = ({ title, items }) => (
  <C sx={{ padding: '1rem', marginBottom: 2 }}>
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
      {items.map((item, i) => (
        <div key={i}>
          <ListItem>
            {item}
          </ListItem>
          <Divider />
        </div>
      ))}
    </List>
  </C>
)