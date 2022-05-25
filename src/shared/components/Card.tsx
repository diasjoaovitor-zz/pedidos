import { ReactNode } from "react"
import { Card as C, Divider, List } from "@mui/material"
import { Title } from "./Title"

type Props = {
  title: string
  children: ReactNode
}

export const Card: React.FC<Props> = ({ title, children }) => (
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
      {title}
    </Title>
    <List sx={{ '& .MuiDivider-root': { backgroundColor: 'gray' } }}>
      <Divider />
      {children}
    </List>
  </C>
)