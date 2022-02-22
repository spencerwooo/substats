import { Flex, Link, Text } from '@chakra-ui/react'
import { RiRssLine } from 'react-icons/ri'

const Footer = () => {
  return (
    <Flex as="footer" width="full" align="center" alignSelf="flex-end" justifyContent="center">
      <RiRssLine />
      <Text fontSize="sm" marginLeft="2" fontWeight="medium">
        Powered by{' '}
        <Link href="https://github.com/spencerwooo/substats" isExternal>
          substats
        </Link>{' '}
        © {new Date().getFullYear()} -{' '}
        <Link href="https://spencerwoo.com" isExternal>
          Spencer Woo
        </Link>
      </Text>
    </Flex>
  )
}

export default Footer
