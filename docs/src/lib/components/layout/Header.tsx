import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  IconButton,
  Spacer,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuGroup,
  MenuDivider,
} from '@chakra-ui/react'
import { FiChevronDown, FiGithub, FiMenu } from 'react-icons/fi'
import { RiRssLine } from 'react-icons/ri'
import { Link as RouterLink } from 'react-router-dom'

import ThemeToggle from './ThemeToggle'

const Header = () => {
  return (
    <Flex as="header" width="full" align="center" alignSelf="flex-start" justifyContent="center" gridGap={2}>
      <Link as={RouterLink} to="/">
        <Button leftIcon={<RiRssLine />} variant="ghost" p="2" marginLeft="-2" fontSize="sm" fontWeight="bold">
          substats
        </Button>
      </Link>

      <Spacer />

      <Link href="https://github.com/spencerwooo/substats" isExternal>
        <IconButton aria-label="github link" size="sm" icon={<FiGithub />} />
      </Link>

      <Box marginLeft="auto" marginRight="-2">
        <ThemeToggle />
      </Box>
    </Flex>
  )
}

export default Header
