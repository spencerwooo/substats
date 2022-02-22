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
} from '@chakra-ui/react'
import { FiGithub, FiMenu } from 'react-icons/fi'
import { RiRssLine } from 'react-icons/ri'
import { Link as RouterLink } from 'react-router-dom'

import ThemeToggle from './ThemeToggle'

const Header = () => {
  return (
    <Flex as="header" width="full" align="center" alignSelf="flex-start" justifyContent="center" gridGap={2}>
      <Button leftIcon={<RiRssLine />} variant="ghost" p="2" marginLeft="-2" fontSize="sm" fontWeight="bold">
        substats
      </Button>

      <Center height="20px" display={{ base: 'none', sm: 'block' }}>
        <Divider orientation="vertical" />
      </Center>

      {/* on desktop */}
      <Link to="/" as={RouterLink} display={{ base: 'none', sm: 'block' }}>
        <Button variant="link" p="2" fontSize="sm" fontWeight="medium">
          Home
        </Button>
      </Link>
      <Link to="/construction" as={RouterLink} display={{ base: 'none', sm: 'block' }}>
        <Button variant="link" p="2" fontSize="sm" fontWeight="medium">
          Docs
        </Button>
      </Link>

      {/* on mobile */}
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          size="sm"
          icon={<FiMenu />}
          display={{ base: 'inline-flex', sm: 'none' }}
        />
        <MenuList>
          <MenuItem>
            <Link to="/" as={RouterLink}>
              Home
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/advanced" as={RouterLink}>
              Docs
            </Link>
          </MenuItem>
        </MenuList>
      </Menu>

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
