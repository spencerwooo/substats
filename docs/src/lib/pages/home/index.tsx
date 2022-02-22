import { Box, Center, Grid, Image, Text } from '@chakra-ui/react'

const Home = () => {
  return (
    <Grid gap={4}>
      <Box maxWidth={[80, 100]} marginX="auto">
        <Image width={100} src="/assets/icons/256.png" />
      </Box>
      <Center>
        <Text>Home</Text>
      </Center>
    </Grid>
  )
}

export default Home
