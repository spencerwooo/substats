import type { PathRouteProps } from 'react-router-dom'

import Construction from 'lib/pages/construction'
import Home from 'lib/pages/home'
import Builder from 'lib/pages/builder'

import Docs from 'lib/pages/docs'

export const routes: Array<PathRouteProps> = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/s/:source',
    element: <Builder />,
  },
  {
    path: '/docs/:id',
    element: <Docs />,
  },
  {
    path: '/construction',
    element: <Construction />,
  },
]

export const privateRoutes: Array<PathRouteProps> = []
