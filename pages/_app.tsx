import type { AppProps } from 'next/app'

import { UiProvider } from '@/context/ui'
import { EntriesProvider } from '@/context/entries'

import { darkTheme, lightTheme } from '@/themes'

import { CssBaseline, ThemeProvider } from '@mui/material'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <EntriesProvider>
      <UiProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UiProvider>
    </EntriesProvider>
  )

}
