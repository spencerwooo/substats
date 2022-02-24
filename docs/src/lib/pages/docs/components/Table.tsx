import { chakra, HTMLChakraProps, useColorModeValue } from '@chakra-ui/react'

export const Table = (props: HTMLChakraProps<'table'>) => (
  <chakra.div overflowX="auto">
    <chakra.table textAlign="left" mt="32px" width="full" {...props} />
  </chakra.div>
)

export const THead = (props: HTMLChakraProps<'th'>) => (
  <chakra.th bg={useColorModeValue('gray.50', 'whiteAlpha.100')} fontWeight="semibold" p={2} fontSize="sm" {...props} />
)

export const TData = (props: HTMLChakraProps<'td'>) => (
  <chakra.td p={2} borderTopWidth="1px" borderColor="inherit" fontSize="sm" whiteSpace="normal" {...props} />
)
