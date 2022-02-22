import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
  fonts: {
    body: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  },
  components: {
    // Button: {
    // }
  },
  config: {
    initialColorMode: "system",
  },
})
