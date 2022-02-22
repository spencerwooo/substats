import {
  Badge,
  Box,
  Center,
  Code,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Text,
} from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { RiArrowRightLine, RiExternalLinkLine, RiSearchLine } from 'react-icons/ri'
import Sources from './components/Sources'

const Home = () => {
  // API prefix for all routes
  const api = 'https://api.swo.moe/stats'

  // Search for available sources by user input
  const [searchInput, setSearchInput] = useState<string>('')
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)

  return (
    <Flex gap={4} direction="column">
      <Box maxWidth={[80, 100]} marginX="auto">
        <Image width={100} src="/assets/icons/256.png" />
      </Box>
      <Center>
        <Link href={api} isExternal display="inline-flex" alignItems="center">
          <Code colorScheme="orange" mr={1}>
            {api}
          </Code>
          <RiExternalLinkLine />
        </Link>
      </Center>

      <InputGroup>
        <InputLeftElement>
          <RiSearchLine />
        </InputLeftElement>
        <Input placeholder="Search for sources ..." value={searchInput} onChange={onInputChange} />
      </InputGroup>

      <Sources searchInput={searchInput} />

      <Center mt={4} color="gray.400">
        <Badge colorScheme="purple" mr={2}>
          new
        </Badge>
        <Link to="/construction" as={RouterLink}>
          <Text mr={2}>
            Looking for: The <Code>/common</Code> route?
          </Text>
        </Link>
        <RiArrowRightLine />
      </Center>
    </Flex>
  )
}

export default Home
