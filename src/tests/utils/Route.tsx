import { ReactNode } from 'react'
import { Router } from 'react-router-dom'
import { MemoryHistory } from 'history'

export const Route: React.FC<{ children: ReactNode, history: MemoryHistory  }> = ({ children, history }) => (
  <Router navigator={history} location={history.location}>
    {children}
  </Router>
)
