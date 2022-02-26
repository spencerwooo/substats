import type { PathRouteProps } from 'react-router-dom'

import Construction from 'lib/pages/construction'
import Home from 'lib/pages/home'
import Builder from 'lib/pages/builder'
import Common from './lib/pages/common'

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
    path: '/common',
    element: <Common />,
  },
  {
    path: '/construction',
    element: <Construction />,
  },
]

export const privateRoutes: Array<PathRouteProps> = []
