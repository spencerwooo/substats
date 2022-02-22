import { Box, Flex } from '@chakra-ui/react'
import type { ReactNode } from 'react'

import Footer from './Footer'
import Header from './Header'
import Meta from './Meta'

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box margin="0 auto" maxWidth={800} transition="0.5s ease-out">
      <Meta />
      <Flex direction="column" margin="4" minHeight="90vh">
        <Header />
        <Box width="full" flex="1" as="main" marginY={22}>
          {children}
        </Box>
        <Footer />
      </Flex>
    </Box>
  )
}

export default Layout
