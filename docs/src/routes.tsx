import type { PathRouteProps } from 'react-router-dom'

import Construction from 'lib/pages/construction'
import Home from 'lib/pages/home'

export const routes: Array<PathRouteProps> = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/construction',
    element: <Construction />,
  },
]

export const privateRoutes: Array<PathRouteProps> = []
