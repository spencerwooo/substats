import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  fonts: {
    body: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  },
  components: {
    // Button: {
    // }
  },
  colors: {
    gray: {
      50: '#fafafa',
      100: '#f4f4f5',
      200: '#e4e4e7',
      300: '#d4d4d8',
      400: '#a1a1aa',
      500: '#71717a',
      600: '#52525b',
      700: '#3f3f46',
      800: '#27272a',
      900: '#18181b',
      // 50: '#fafafa',
      // 100: '#f5f5f5',
      // 200: '#e5e5e5',
      // 300: '#d4d4d4',
      // 400: '#a3a3a3',
      // 500: '#737373',
      // 600: '#525252',
      // 700: '#404040',
      // 800: '#262626',
      // 900: '#171717',
    },
  },
  config: {
    initialColorMode: 'system',
  },
})
