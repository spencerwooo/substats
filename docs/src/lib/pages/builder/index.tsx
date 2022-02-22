import { Flex } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

const Builder = () => {
  const { source } = useParams()
  return (
    <Flex alignItems="center" justifyContent="center" height="60vh">
      {source}
    </Flex>
  )
}

export default Builder
