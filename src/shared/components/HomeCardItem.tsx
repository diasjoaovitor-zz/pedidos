import { Divider, ListItem } from "@mui/material"
import { Link } from "react-router-dom"
import { useProductContext } from "../contexts"
import { TProductPresentation } from "../types"

type Props = {
  item: string
}

export const HomeCardItem: React.FC<Props> = ({ item }) => {
  const { setProductPresentationContext } = useProductContext()

  return (
    <>
    <Link to="/search" state={item} onClick={() => {
      setProductPresentationContext({} as TProductPresentation)
    }}>
      <ListItem>{item}</ListItem>
    </Link>
    <Divider />
    </>
  )
}
