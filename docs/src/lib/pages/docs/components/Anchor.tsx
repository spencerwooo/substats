import { forwardRef, Link } from '@chakra-ui/react'

export const Anchor = forwardRef((props: any, ref: any) => <Link ref={ref} color="orange.300" {...props} />)
