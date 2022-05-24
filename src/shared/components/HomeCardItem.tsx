import { Divider, ListItem } from "@mui/material"
import { Link } from "react-router-dom"

type Props = {
  item: string
}

export const HomeCardItem: React.FC<Props> = ({ item }) => (
  <>
  <ListItem>
    <Link to="/search" state={item}>{item}</Link>
  </ListItem>
  <Divider />
  </>
)
