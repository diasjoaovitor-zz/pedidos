import { ReactNode } from "react"
import { Link } from "react-router-dom"
import { Card as C, Typography, List, ListItem, Divider } from "@mui/material"

type Props = {
  title: string
  items?: string[]
  children?: ReactNode
}

export const Card: React.FC<Props> = ({ title, items, children }) => (
  <C sx={{ 
    padding: 2, 
    marginTop: 2,
    textAlign: 'left', 
    '& a': {
      textDecoration: 'none',
      color: 'inherit'
    }
  }}>
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
          marginTop: '5px',
          marginBottom: 2
        }
      }}
    >
      <Link to="/search" state={title}>
        {title}
      </Link>
    </Typography>
    <List>
      <Divider />
      {!children ? items && items.map((item, i) => (
        <div key={i}>
          <ListItem>
            <Link to="/search" state={item}>
              {item}
            </Link>
          </ListItem>
          <Divider />
        </div>
      )) : children}
    </List>
  </C>
)