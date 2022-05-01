import { ReactNode } from "react"
import { Link } from "react-router-dom"
import { Card as C, List, ListItem, Divider } from "@mui/material"
import { Title } from "./"

type Props = {
  title: string
  items?: string[]
  children?: ReactNode
}

export const Card: React.FC<Props> = ({ title, items, children }) => (
  <C sx={{ 
    padding: 2, 
    paddingBottom: 1,
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
    <List sx={{ '& .MuiDivider-root': { backgroundColor: 'gray'} }}>
      <Divider />
      {!children ? items && 
        items.length > 0 ? items.map((item, i) => (
          <div key={i}>
            <ListItem>
              <Link to="/search" state={item}>
                {item}
              </Link>
            </ListItem>
            <Divider />
          </div>
        )) : <ListItem>{
            title === 'Empresas' ? 
              'Nenhuma empresa encontrada' :
              'Nenhum produto encontrado'
          }</ListItem>
      : children}
    </List>
  </C>
)