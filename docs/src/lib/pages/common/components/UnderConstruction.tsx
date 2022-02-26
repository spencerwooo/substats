import { Box, Text, Image } from '@chakra-ui/react'

const UnderConstruction = () => {
  return (
    <Box>
      <Box maxWidth={[280, 300]} marginX="auto">
        <Image width={300} src="/assets/flame-design-science.png" />
      </Box>
      <Text align="center">Under construction...</Text>
    </Box>
  )
}

export default UnderConstruction
