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
  FormHelperText,
  FormLabel,
  IconButton,
  Image,
  Input,
  InputGroup,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useClipboard,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import { RiArrowLeftLine, RiCheckLine, RiClipboardLine, RiErrorWarningLine } from 'react-icons/ri'
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom'

import { availableSources } from '../availableSources'

// API prefix for all routes
const API = 'https://api.swo.moe/stats'

const BuilderItem = ({ value, description }: { value: string; description: string }) => {
  const { hasCopied, onCopy } = useClipboard(value)
  return (
    <FormControl>
      <FormLabel fontSize="xs" textTransform="uppercase" fontWeight="medium" letterSpacing="widest">
        {description}
      </FormLabel>
      <Flex>
        <Input value={value} isReadOnly color={useColorModeValue('gray.500', 'whiteAlpha.500')} />
        <IconButton
          onClick={onCopy}
          ml={2}
          aria-label="Copy to clipboard"
          icon={hasCopied ? <RiCheckLine /> : <RiClipboardLine />}
        />
      </Flex>
    </FormControl>
  )
}

const Builder = () => {
  const { source } = useParams()
  const navigate = useNavigate()
  const details = availableSources.find(s => s.source === source)

  // Modal states for when the 'source' is not found
  // const { isOpen, onOpen, onClose } = useDisclosure()
  const modalOpen = details === undefined

  // Invert GitHub and Medium icon colors on dark mode as these icons are too dark
  const blackIconFilter = ['github', 'medium'].includes(source ?? '') ? useColorModeValue('', 'invert(1)') : ''

  const [keyInput, setKeyInput] = useState<string>('')
  const onKeyInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setKeyInput(e.target.value)

  // Generate URLs based on source and key
  const apiUrl = `${API}/${source}/${encodeURIComponent(keyInput || '...')}`

  const badgeUrl = new URL('https://img.shields.io/badge/dynamic/json')
  badgeUrl.searchParams.append('url', apiUrl)
  badgeUrl.searchParams.append('query', 'count')
  badgeUrl.searchParams.append('color', details?.badge.color || '')
  badgeUrl.searchParams.append('label', details?.badge.label || '')
  badgeUrl.searchParams.append('labelColor', details?.badge.labelColor || '')
  badgeUrl.searchParams.append('logo', details?.badge.logo || '')
  badgeUrl.searchParams.append('logoColor', details?.badge.logoColor || '')
  badgeUrl.searchParams.append('suffix', ' ' + details?.badge.suffix || '')
  badgeUrl.searchParams.append('cacheSeconds', '3600')

  return (
    <Flex gap={4} direction="column">
      <Modal isOpen={modalOpen} onClose={() => false} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="inline-flex" alignItems="center">
            <RiErrorWarningLine /> <Text ml="1">Uh-oh!</Text>
          </ModalHeader>
          <ModalBody>
            Seems that <Code>{source}</Code> is not available yet. But maybe, you are looking for{' '}
            <Link as={RouterLink} to="/construction" color="purple.500">
              the <Code colorScheme="purple">/common</Code> route
            </Link>
            ?
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="orange" onClick={() => navigate('/')} leftIcon={<RiArrowLeftLine />}>
              Back home
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box maxWidth={50} marginX="auto">
        <Image width={50} src={details?.icon || '/assets/icons/256.png'} filter={blackIconFilter} />
      </Box>
      <Flex wrap="wrap" alignItems="center" justify="center" mt={4} gap={1}>
        <Code>{API}</Code>
        <Text>/</Text>
        <Code colorScheme="blue" mr={1}>
          {source}
        </Code>
        <Text>/</Text>
        <Code colorScheme="orange" mr={1}>
          {keyInput || ':key'}
        </Code>
      </Flex>

      {/* If source has warning description here */}
      {details?.warning && (
        <Alert status="warning" variant="left-accent">
          <AlertIcon />
          {details.warning}
        </Alert>
      )}

      <FormControl>
        <FormLabel fontSize="xs" textTransform="uppercase" fontWeight="medium" letterSpacing="widest">
          Query key
        </FormLabel>
        <InputGroup>
          <Input value={keyInput} placeholder="username, uid, key, ..." onChange={onKeyInputChange} />
        </InputGroup>
        <FormHelperText>Enter your username, uid, or other stuff for {source}.</FormHelperText>
      </FormControl>

      <Divider my={4} />

      <Box>
        <Text fontSize="xs" textTransform="uppercase" fontWeight="medium" letterSpacing="widest" mb={2}>
          Badge preview
        </Text>
        <Link href={details?.badge.link(keyInput)} display="inline-block" isExternal>
          <Image src={badgeUrl.toString()} alt="badge" height={5} />
        </Link>
      </Box>

      <BuilderItem value={apiUrl} description="API URL" />
      <BuilderItem value={badgeUrl.toString()} description="Badge URL" />
      <BuilderItem
        value={`[![${details?.badge.label}](${badgeUrl})](${details?.badge.link(keyInput)})`}
        description="Markdown"
      />

      <Text mt={8} fontSize="sm" textColor="gray.400">
        Badges generated by{' '}
        <Link href="https://shields.io" isExternal>
          shields.io
        </Link>
        .
      </Text>
    </Flex>
  )
}

export default Builder
