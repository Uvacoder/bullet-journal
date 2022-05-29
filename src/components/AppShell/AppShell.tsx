import { useState, useCallback } from 'react'

import {
  AppShell as MantineAppShell,
  Navbar,
  Header,
  Footer,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Stack,
} from '@mantine/core'
import { Link } from '../Link/Link'

type CustomAppShellProps = {
  children: React.ReactNode
}
export const AppShell = ({ children }: CustomAppShellProps) => {
  const theme = useMantineTheme()
  const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false)

  const NavigationLinks = useCallback(() => {
    return (
      <>
        <Stack justify='flex-start'>
          <Link href='/'> Home </Link>
          <Link href='/journal'> Journal </Link>
          <Link href='/kanye'> Kanye </Link>
        </Stack>
      </>
    )
  }, [])

  return (
    <MantineAppShell
      navbarOffsetBreakpoint='sm'
      asideOffsetBreakpoint='sm'
      fixed
      navbar={
        <Navbar
          p='md'
          hiddenBreakpoint='sm'
          hidden={!mobileNavigationOpen}
          width={{ sm: 200, lg: 300 }}
        >
          <NavigationLinks />
        </Navbar>
      }
      footer={
        <Footer height={60} p='md'>
          Application footer
        </Footer>
      }
      header={
        <Header height={70} p='md'>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
              <Burger
                opened={mobileNavigationOpen}
                onClick={() => setMobileNavigationOpen((o) => !o)}
                size='sm'
                color={theme.colors.gray[6]}
                mr='xl'
              />
            </MediaQuery>

            <Text>Application header</Text>
          </div>
        </Header>
      }
    >
      {children}
    </MantineAppShell>
  )
}
