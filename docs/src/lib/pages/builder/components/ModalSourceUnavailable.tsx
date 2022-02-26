import {
  Button,
  Code,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { useRef } from 'react'
import { RiArrowLeftLine, RiErrorWarningLine } from 'react-icons/ri'
import { Link as RouterLink } from 'react-router-dom'

const ModalSourceUnavailable = ({ isOpen, source }: { isOpen: boolean; source: string }) => {
  const initialFocusRef = useRef<HTMLButtonElement>(null)
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => false}
      initialFocusRef={initialFocusRef}
      motionPreset="slideInBottom"
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader display="inline-flex" alignItems="center">
          <RiErrorWarningLine /> <Text ml="1">Uh-oh!</Text>
        </ModalHeader>
        <ModalBody>
          Seems that <Code>{source}</Code> is not available yet. But maybe you are looking for:{' '}
          <Link as={RouterLink} to="/common" color="purple.400">
            the <Code colorScheme="purple">/common</Code> route
          </Link>
          ?
        </ModalBody>

        <ModalFooter>
          <Link as={RouterLink} to="/">
            <Button ref={initialFocusRef} colorScheme="orange" leftIcon={<RiArrowLeftLine />}>
              Back home
            </Button>
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalSourceUnavailable
