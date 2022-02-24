import { Box, BoxProps, IconButton, IconButtonProps, useClipboard, useColorModeValue } from '@chakra-ui/react'
import { RiCheckLine, RiClipboardLine } from 'react-icons/ri'
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs'

interface CopyButtonProps extends IconButtonProps {
  code: string
}

const CodeContainer = (props: BoxProps) => {
  return (
    <Box py={1} rounded="8px" backgroundColor={useColorModeValue('rgb(250,250,250)', 'rgb(40,44,52)')} {...props} />
  )
}

const CopyButton = ({ code, ...props }: CopyButtonProps) => {
  const { hasCopied, onCopy } = useClipboard(code)

  return (
    <IconButton
      icon={hasCopied ? <RiCheckLine /> : <RiClipboardLine />}
      size="sm"
      colorScheme="gray"
      position="absolute"
      top={1}
      right={1}
      zIndex="1"
      {...props}
      onClick={onCopy}
    />
  )
}

const CodeBlock = (props: any) => {
  const { className, children } = props.children.props
  const language = className?.replace(/language-/, '')
  const rawCode = children.trim()
  return (
    <Box position="relative" zIndex="0">
      <CodeContainer px="1" overflow="hidden" fontSize="sm" lineHeight={1.4}>
        <SyntaxHighlighter language={language} style={useColorModeValue(atomOneLight, atomOneDark)}>
          {rawCode}
        </SyntaxHighlighter>
      </CodeContainer>
      <CopyButton aria-label="copy code to clipboard" code={rawCode} />
    </Box>
  )
}
export default CodeBlock
