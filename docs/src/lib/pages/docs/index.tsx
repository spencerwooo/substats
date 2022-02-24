import * as Chakra from '@chakra-ui/react'
import {
  Alert,
  Box,
  Center,
  chakra,
  Code,
  Flex,
  Heading,
  HTMLChakraProps,
  Kbd,
  Link,
  ListItem,
  OrderedList,
  Table,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import { lazy, Suspense } from 'react'
import { useParams } from 'react-router-dom'
import { Anchor } from './components/Anchor'
import CodeBlock from './components/CodeBlock'
import { TData, THead } from './components/Table'

const LinkedHeading = (props: any) => (
  <Heading as="h2" lineHeight={2} css={{ scrollMarginBlock: '6.875rem' }} {...props}>
    <span className="content">{props.children}</span>
    {props.id && (
      <Link
        aria-label="anchor"
        color="teal.500"
        fontWeight="normal"
        outline="none"
        _focus={{ opacity: 1, boxShadow: 'outline' }}
        opacity={0}
        _groupHover={{ opacity: 1 }}
        ml="0.375rem"
        href={`#${props.id}`}
      >
        #
      </Link>
    )}
  </Heading>
)

const InlineCode = (props: any) => <Code fontSize="sm" colorScheme="orange" lineHeight={1.5} {...props} />
const Pre = (props: any) => <Box my="2em" borderRadius="sm" {...props} />

const Docs = () => {
  const { id } = useParams()
  const Mdx = lazy(() => import(`../../../docs/${id}.mdx`))
  return (
    <Suspense fallback={<Box>...</Box>}>
      <Flex gap={4} direction="column">
        <Mdx
          components={{
            ...Chakra,
            h1: (props: HTMLChakraProps<'h1'>) => (
              <Center>
                <Heading as="h1" lineHeight={2} fontSize="xl" {...props} />
              </Center>
            ),
            h2: (props: HTMLChakraProps<'h2'>) => <LinkedHeading fontSize="2xl" {...props} />,
            h3: (props: HTMLChakraProps<'h3'>) => <LinkedHeading as="h3" fontSize="xl" {...props} />,
            h4: (props: HTMLChakraProps<'h4'>) => (
              <LinkedHeading as="h4" fontSize="lg" fontWeight="medium" {...props} />
            ),
            hr: (props: HTMLChakraProps<'hr'>) => <chakra.hr apply="mdx.hr" {...props} />,
            strong: (props: HTMLChakraProps<'strong'>) => <Box as="strong" fontWeight="semibold" {...props} />,
            code: InlineCode,
            pre: (props: HTMLChakraProps<'pre'>) => {
              if (typeof props.children === 'string') return <Pre {...props} />
              return <CodeBlock {...props} />
            },
            kbd: Kbd,
            br: ({ reset, ...props }: any) => (
              <Box as={reset ? 'br' : undefined} height={reset ? undefined : '24px'} {...props} />
            ),
            table: Table,
            th: THead,
            td: TData,
            a: Anchor,
            p: (props: HTMLChakraProps<'p'>) => <Text as="p" lineHeight={1.8} {...props} />,
            ul: (props: HTMLChakraProps<'ul'>) => <UnorderedList {...props} />,
            ol: (props: HTMLChakraProps<'ol'>) => <OrderedList {...props} />,
            li: (props: HTMLChakraProps<'li'>) => <ListItem lineHeight={1.8} {...props} />,
            blockquote: (props: HTMLChakraProps<'blockquote'>) => (
              <Alert
                display="block"
                mt="4"
                role="none"
                variant="left-accent"
                as="blockquote"
                rounded="4px"
                my="1.5rem"
                {...props}
              />
            ),
          }}
        />
      </Flex>
    </Suspense>
  )
}

export default Docs
