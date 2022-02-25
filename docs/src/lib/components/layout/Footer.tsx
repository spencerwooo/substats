import { Box, Center, Link, Text, Tooltip } from '@chakra-ui/react'
import { RiHeart2Line, RiRssLine } from 'react-icons/ri'

const Footer = () => {
  return (
    <Box as="footer" mt={8}>
      <Center>
        <RiRssLine />
        <Text fontSize="sm" marginLeft={2} fontWeight="medium">
          Powered by{' '}
          <Tooltip label={COMMIT_HASH}>
            <Link href="https://github.com/spencerwooo/substats" isExternal color="orange.300">
              substats v2
            </Link>
          </Tooltip>{' '}
          © {new Date().getFullYear()}
        </Text>
      </Center>

      <Center>
        <RiHeart2Line />
        <Text fontSize="sm" marginLeft={2} fontWeight="medium">
          Made with love by{' '}
          <Link href="https://spencerwoo.com" isExternal color="orange.300">
            Spencer Woo
          </Link>
        </Text>
      </Center>
    </Box>
  )
}

export default Footer
