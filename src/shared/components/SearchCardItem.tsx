import { Divider, ListItem, Typography } from "@mui/material"
import { MouseEvent } from "react"
import { TProductPresentation } from "../types"

type Props = {
  product: TProductPresentation
  handleClick(e: MouseEvent<HTMLElement>): void
}

export const SearchCardItem: React.FC<Props> = ({ product, handleClick }) => (
  <>
  <ListItem 
    sx={{ 
      justifyContent: 'space-between', 
      paddingX: 0, 
      cursor: 'pointer' 
    }}
    onClick={handleClick}
  >
    <div>
      <Typography variant="inherit" component="h3">
        {product.name}
      </Typography>
      <Typography variant="subtitle1" component="p">
        {product.brand} - {product.description}
      </Typography>
      <Typography variant="subtitle2" component="p">
        Vendido por: {product.company}
      </Typography>
    </div>
    <Typography variant="h5" component="strong" fontWeight="bold" textAlign="right">
      {product.price}
    </Typography>
  </ListItem>
  <Divider />
  </>
)