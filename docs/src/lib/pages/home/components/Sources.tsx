import { useState } from 'react'
import Fuse from 'fuse.js'
import { Box, Button, Center, Code, Flex, Grid, GridItem, Image, Text } from '@chakra-ui/react'
import { GiCardRandom } from 'react-icons/gi'

import { availableSources } from './availableSources'

// GridItem component for each of the available sources
const SourceGrid = ({ source }: { source: typeof availableSources[number] }) => (
  <GridItem role="group">
    <Flex gap={4} alignItems="center">
      <Box flex={1} overflow="hidden">
        <Code mb={2}>{source.source}</Code>
        <Text color="gray.500" fontSize="sm" isTruncated>
          {source.description}
        </Text>
      </Box>
      <Box width={8} height={8} flexShrink={0}>
        <Image width={8} src={source.icon} filter="grayscale(0.5)" _groupHover={{ filter: 'grayscale(0)' }} />
      </Box>
    </Flex>
  </GridItem>
)

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
      <Grid templateColumns="repeat(2, minmax(0, 1fr))" gap={8} mt={4} overflowY="scroll">
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
