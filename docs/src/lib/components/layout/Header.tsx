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
      <Menu>
        <MenuButton size="sm" as={Button} rightIcon={<FiChevronDown />} display={{ base: 'none', sm: 'block' }}>
          Docs
        </MenuButton>
        <MenuList>
          <Link to="/docs/getting-started" as={RouterLink}>
            <MenuItem>Getting started</MenuItem>
          </Link>
          <Link to="/docs/whats-new" as={RouterLink}>
            <MenuItem>What's new?</MenuItem>
          </Link>
        </MenuList>
      </Menu>

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
          <MenuGroup title="URL Builder">
            <Link to="/" as={RouterLink}>
              <MenuItem>Home</MenuItem>
            </Link>
          </MenuGroup>

          <MenuDivider />
          <MenuGroup title="Docs">
            <Link to="/docs/getting-started" as={RouterLink}>
              <MenuItem>Getting started</MenuItem>
            </Link>
            <Link to="/docs/whats-new" as={RouterLink}>
              <MenuItem>What's new?</MenuItem>
            </Link>
          </MenuGroup>
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
