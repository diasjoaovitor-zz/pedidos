import { createMemoryHistory } from 'history'
import { ReactNode } from 'react'
import { Router } from 'react-router-dom'

export const history = createMemoryHistory({ initialEntries: ['/'] })

export const Route: React.FC<{ children: ReactNode }> = ({ children}) => (
  <Router navigator={history} location={history.location}>
    {children}
  </Router>
)
