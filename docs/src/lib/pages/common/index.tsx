import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  Code,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  SkeletonText,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useAsync } from 'react-async-hook'
import { AiOutlineApi } from 'react-icons/ai'
import ReactJson from 'react-json-view'
import useLocalStorage from 'use-local-storage'
import { API, BuilderItem } from '../builder'

const DataContainer = ({ api }: { api: string }) => {
  const fetchApi = async (api: string) => (await fetch(api)).json()
  // If the API URL is empty, return empty component
  if (!api) return <Text>...</Text>

  const { loading, error, result } = useAsync(fetchApi, [api])
  if (error)
    return (
      <Alert status="error">
        <AlertIcon />
        <Text>
          An error occured. Maybe it's because of{' '}
          <Link color="red.600" href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS" isExternal>
            CORS
          </Link>
          ?
        </Text>
      </Alert>
    )
  if (loading) return <SkeletonText spacing={4} noOfLines={4} />
  return (
    <Box maxHeight={56} overflowY="scroll">
      <ReactJson src={result} theme={useColorModeValue('rjv-default', 'railscasts')} />
    </Box>
  )
}

const Common = () => {
  const [userEnteredApi, setUserEnteredApi] = useLocalStorage<string>('common.api', '')
  const [apiToFetch, setApiToFetch] = useState<string>('')
  const onSetUserEnteredApi = (e: React.ChangeEvent<HTMLInputElement>) => setUserEnteredApi(e.target.value)

  const [dataPath, setDataPath] = useLocalStorage<string>('common.datapath', '')
  const onSetDataPath = (e: React.ChangeEvent<HTMLInputElement>) => setDataPath(e.target.value)

  const apiUrl = `${API}/common/?endpoint=${userEnteredApi}&datapath=${dataPath}`

  return (
    <Flex gap={4} direction="column">
      <Center flexDirection="column">
        <AiOutlineApi size={40} />
        <Text fontWeight="bold" fontSize="lg" mt={4}>
          The{' '}
          <Code colorScheme="orange" fontSize="md">
            /common
          </Code>{' '}
          route
        </Text>
      </Center>

      <Alert variant="left-accent" colorScheme="gray" mt={4}>
        <Text>
          This route is for querying arbitrary API endpoints with a simple GET request.{' '}
          <Link href="https://github.com/spencerwooo/substats#advanced-" isExternal color="orange.500">
            How to use this?
          </Link>
        </Text>
      </Alert>

      <FormControl>
        <FormLabel fontSize="xs" textTransform="uppercase" fontWeight="medium" letterSpacing="widest">
          Your Endpoint
        </FormLabel>
        <Flex>
          <Input
            value={userEnteredApi}
            placeholder="https://api.example.com/v1/endpoint"
            onChange={onSetUserEnteredApi}
          />
          <Button ml={2} onClick={() => setApiToFetch(userEnteredApi)}>
            TEST
          </Button>
        </Flex>
      </FormControl>

      <Text mb={-2} fontSize="xs" textTransform="uppercase" fontWeight="medium" letterSpacing="widest">
        Result
      </Text>
      <Box p={4} border="1px" borderColor="inherit" borderRadius="md">
        <DataContainer api={apiToFetch} />
      </Box>

      <FormControl>
        <FormLabel fontSize="xs" textTransform="uppercase" fontWeight="medium" letterSpacing="widest">
          Your datapath
        </FormLabel>
        <Input value={dataPath} placeholder="path.to.your.data" onChange={onSetDataPath} />
      </FormControl>

      <Divider my={4} />

      <BuilderItem value={apiUrl} description="API URL" />
    </Flex>
  )
}

export default Common
