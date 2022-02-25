import {
  Alert,
  AlertIcon,
  Box,
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
  Text,
  useClipboard,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import { RiCheckLine, RiClipboardLine, RiEditLine } from 'react-icons/ri'
import { useParams } from 'react-router-dom'
import useLocalStorage from 'use-local-storage'

import { availableSources, whiteLogoSources } from '@/sources'
import ModalEditBadge from './components/ModalEditBadge'
import ModalSourceUnavailable from './components/ModalSourceUnavailable'

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

export const apiUrlBuilder = ({ source, key }: { source: string; key: string }) => {
  return `${API}/${source}/${encodeURIComponent(key)}`
}

const Builder = () => {
  const { source } = useParams()
  const details = availableSources.find(s => s.source === source)

  // Modal states for when the 'source' is not found
  const unavailableSourceModalOpen = details === undefined
  // Modal states for handling the badge customisation
  const { isOpen, onOpen, onClose } = useDisclosure()

  // Invert GitHub and Medium icon colors on dark mode as these icons are too dark
  const blackIconFilter = whiteLogoSources.includes(source ?? '') ? useColorModeValue('', 'invert(1)') : ''

  // Handle input states, this is where the user defines their key for this source
  const [keyInput, setKeyInput] = useLocalStorage(`${source}.key`, '')
  const onKeyInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setKeyInput(e.target.value)

  // Generate URLs based on source and key
  const apiUrl = apiUrlBuilder({ source: source || '', key: keyInput || '...' })

  // Generate badge based on preconfigured styles and user input, this is passed from the child modal component
  const [badgeUrl, setBadgeUrl] = useState('')
  const buildBadgeUrl = (url: string) => setBadgeUrl(url)

  return (
    <Flex gap={4} direction="column">
      <ModalSourceUnavailable isOpen={unavailableSourceModalOpen} source={source ?? ''} />
      {details && (
        <ModalEditBadge
          isOpen={isOpen}
          onClose={onClose}
          apiUrl={apiUrl}
          key={keyInput}
          details={details}
          buildBadgeUrl={buildBadgeUrl}
        />
      )}

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
        <FormHelperText>{details?.helper || `Enter your username or uid for ${source}.`}</FormHelperText>
      </FormControl>

      <Divider my={4} />

      <Box>
        <Text fontSize="xs" textTransform="uppercase" fontWeight="medium" letterSpacing="widest" mb={2}>
          Badge preview
        </Text>
        <Flex alignItems="center">
          <Link href={details?.badge.link(keyInput)} display="inline-block" isExternal>
            <Image src={badgeUrl} alt="badge" height={5} />{' '}
          </Link>
          <IconButton onClick={onOpen} ml={2} aria-label="edit shields.io badge" size="sm" icon={<RiEditLine />} />
        </Flex>
      </Box>

      <BuilderItem value={apiUrl} description="API URL" />
      <BuilderItem value={badgeUrl} description="Badge URL" />
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
