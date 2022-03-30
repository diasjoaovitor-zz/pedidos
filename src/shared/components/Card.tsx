import { ReactNode } from "react"
import { Link } from "react-router-dom"
import { Card as C, Typography, List, ListItem, Divider } from "@mui/material"
import { Title } from "./"

type Props = {
  title: string
  items?: string[]
  children?: ReactNode
}

export const Card: React.FC<Props> = ({ title, items, children }) => (
  <C sx={{ 
    padding: 2, 
    paddingBottom: 0,
    marginTop: 2,
    textAlign: 'left', 
    '& a': {
      textDecoration: 'none',
      color: 'inherit'
    }
  }}>
    <Title component="h2">
      <Link to="/search" state={title}>
        {title}
      </Link>
    </Title>
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