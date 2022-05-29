import { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import { store } from '../src/config/store'
import { MantineProvider } from '@mantine/core'

import { baseTheme } from '../src/config/theme'
import { AppShell } from '../src/components/AppShell/AppShell'

function MyApp({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false)
  useEffect(() => {
    setShowChild(true)
  }, [])
  if (!showChild) {
    return null
  }
  if (typeof window === 'undefined') {
    return <></>
  }

  return (
    <Provider store={store}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={baseTheme}>
        <AppShell>
          <Component {...pageProps} />
        </AppShell>
      </MantineProvider>
    </Provider>
  )
}

export default MyApp
