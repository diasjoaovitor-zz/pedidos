import { Typography } from "@mui/material"
import { ElementType, ReactNode } from "react"

type Props = {
  component: ElementType
  children: ReactNode
}

export const Title: React.FC<Props> = ({ component, children }) => (
  <Typography 
      variant="h5" 
      component={component}
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
      {children}
    </Typography>
)