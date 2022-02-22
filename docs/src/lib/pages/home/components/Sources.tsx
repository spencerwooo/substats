import { useState } from 'react'
import Fuse from 'fuse.js'
import { Box, Button, Center, Code, Grid, GridItem, Image, Link, Text, useColorModeValue } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { GiCardRandom } from 'react-icons/gi'

import { availableSources } from './availableSources'

// GridItem component for each of the available sources
const SourceGrid = ({ source }: { source: typeof availableSources[number] }) => {
  const blackIconFilter = ['github', 'medium'].includes(source.source)
    ? useColorModeValue('grayscale(0.5)', 'grayscale(0.5) invert(1)')
    : 'grayscale(0.5)'

  return (
    <GridItem role="group">
      <Link as={RouterLink} to={`/s/${source.source}`} _groupHover={{ textDecoration: 'none' }}>
        <Button
          variant="ghost"
          display="flex"
          width="100%"
          height="72px"
          textAlign="left"
          justifyContent="start"
          alignItems="center"
        >
          <Box flex={1}>
            <Code mb={2}>{source.source}</Code>
            <Text color="gray.500" fontSize="sm" isTruncated>
              {source.description}
            </Text>
          </Box>
          <Box width={8} height={8} flexShrink={0}>
            <Image width={8} src={source.icon} filter={blackIconFilter} />
          </Box>
        </Button>
      </Link>
    </GridItem>
  )
}

const Sources = ({ searchInput }: { searchInput: string }) => {
  // Create fuse search instance
  const fuse = new Fuse(availableSources, {
    keys: ['source', 'description'],
  })
  // Search for sources based on user input
  const searchedSources = fuse.search(searchInput)

  // Feeling lucky!
  const randomPick = () => availableSources.sort(() => 0.5 - Math.random()).slice(0, 6)
  const [randomSources, setRandomSources] = useState(randomPick())
  const feelLucky = () => setRandomSources(randomPick())

  return (
    <>
      <Grid templateColumns="repeat(2, minmax(0, 1fr))" gap={4} mt={4}>
        {searchInput === ''
          ? randomSources.map(source => <SourceGrid key={source.source} source={source} />)
          : searchedSources.map(source => <SourceGrid key={source.item.source} source={source.item} />)}
      </Grid>
      {searchInput === '' && (
        <Center mt={12}>
          <Button onClick={feelLucky} leftIcon={<GiCardRandom />}>
            Feeling lucky?
          </Button>
        </Center>
      )}
    </>
  )
}
export default Sources
