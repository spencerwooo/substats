import {
  Button,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
} from '@chakra-ui/react'
import { availableSources } from 'lib/pages/availableSources'
import React from 'react'
import { HexColorInput, HexColorPicker } from 'react-colorful'
import { RiHashtag } from 'react-icons/ri'
import useLocalStorage from 'use-local-storage'

type Badge = Omit<typeof availableSources[number]['badge'], 'link'>

const badgeUrlBuilder = ({
  url,
  query = 'count',
  color,
  label,
  labelColor,
  logo,
  logoColor,
  suffix,
}: {
  url: string
  query: string
  color: string
  label: string
  labelColor?: string
  logo?: string
  logoColor?: string
  suffix?: string
}) => {
  const badgeUrl = new URL('https://img.shields.io/badge/dynamic/json')
  badgeUrl.searchParams.append('url', url)
  badgeUrl.searchParams.append('query', query)

  badgeUrl.searchParams.append('color', color)
  badgeUrl.searchParams.append('label', label)

  // All of the rest parameters are optional
  labelColor && badgeUrl.searchParams.append('labelColor', labelColor)
  logo && badgeUrl.searchParams.append('logo', logo)
  logoColor && badgeUrl.searchParams.append('logoColor', logoColor)
  suffix && badgeUrl.searchParams.append('suffix', ' ' + suffix)
  badgeUrl.searchParams.append('cacheSeconds', '3600')

  return badgeUrl
}

const BadgeEditFormItem = ({
  badge,
  setBadge,
  badgeName,
  isColor,
}: {
  badge: Badge
  setBadge: any
  badgeName: keyof Badge
  isColor?: boolean
}) => {
  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => setBadge({ ...badge, [badgeName]: e.target.value })
  const onColorChange = (color: string) => setBadge({ ...badge, [badgeName]: color.slice(1) })
  return (
    <FormControl>
      <FormLabel
        textColor="gray.400"
        fontSize="xs"
        textTransform="uppercase"
        fontWeight="medium"
        letterSpacing="widest"
      >
        {badgeName}
      </FormLabel>
      {isColor ? (
        <HStack spacing={4}>
          <InputGroup size="sm">
            <InputLeftAddon>
              <RiHashtag />
            </InputLeftAddon>
            <Input value={badge[badgeName]} onChange={onValueChange} />
          </InputGroup>

          <Popover placement="left" matchWidth>
            <PopoverTrigger>
              <Button variant="ghost" size="sm" backgroundColor={`#${badge[badgeName]}`} />
            </PopoverTrigger>
            <PopoverContent width="fit-content">
              <HexColorPicker color={`#${badge[badgeName]}`} onChange={onColorChange} />
            </PopoverContent>
          </Popover>
        </HStack>
      ) : (
        <Input size="sm" value={badge[badgeName]} onChange={onValueChange} />
      )}
    </FormControl>
  )
}

const ModalEditBadge = ({
  isOpen,
  onClose,
  apiUrl,
  key,
  details,
  buildBadgeUrl,
}: {
  isOpen: boolean
  onClose: () => void
  apiUrl: string
  key: string
  details: typeof availableSources[number]
  buildBadgeUrl: (url: string) => void
}) => {
  // All customisable options - also stored locally
  const source = details.source
  const [badge, setBadge] = useLocalStorage(`${source}.badge`, details.badge)

  const badgeUrl = badgeUrlBuilder({
    url: apiUrl,
    query: 'count',
    label: badge.label,
    color: badge.color || '#00adb5',
    labelColor: badge.labelColor,
    logo: badge.logo,
    logoColor: badge.logoColor,
    suffix: badge.suffix,
  })

  // Pass the badge URL to the parent component
  buildBadgeUrl(badgeUrl.toString())

  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Customise Shields.io badge</ModalHeader>
        <ModalCloseButton />

        <Center my={4}>
          <Image src={badgeUrl.toString()} alt={source} />
        </Center>

        <ModalBody>
          <Stack spacing={4}>
            <BadgeEditFormItem badge={badge} setBadge={setBadge} badgeName="label" />
            <BadgeEditFormItem badge={badge} setBadge={setBadge} badgeName="color" isColor />
            <BadgeEditFormItem badge={badge} setBadge={setBadge} badgeName="labelColor" isColor />
            <BadgeEditFormItem badge={badge} setBadge={setBadge} badgeName="logo" />
            <BadgeEditFormItem badge={badge} setBadge={setBadge} badgeName="logoColor" isColor />
            <BadgeEditFormItem badge={badge} setBadge={setBadge} badgeName="suffix" />
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Text fontSize="sm">*These changes are also stored locally 🍀</Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
export default ModalEditBadge
