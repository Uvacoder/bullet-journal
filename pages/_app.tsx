import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { store } from "../src/store";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  MantineProvider,
  useMantineTheme,
} from "@mantine/core";

import { baseTheme } from "../src/theme";

function MyApp({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  if (!showChild) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  }

  return (
    <Provider store={store}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={baseTheme}>
        <AppShell
          styles={{
            main: {
              // background:
              //   theme.colorScheme === "dark"
              //     ? theme.colors.dark[8]
              //     : theme.colors.gray[0],
            },
          }}
          navbarOffsetBreakpoint="sm"
          asideOffsetBreakpoint="sm"
          fixed
          navbar={
            <Navbar
              p="md"
              hiddenBreakpoint="sm"
              hidden={!opened}
              width={{ sm: 200, lg: 300 }}
            >
              <Text>Application navbar</Text>
            </Navbar>
          }
          aside={
            <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
              <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
                <Text>Application sidebar</Text>
              </Aside>
            </MediaQuery>
          }
          footer={
            <Footer height={60} p="md">
              Application footer
            </Footer>
          }
          header={
            <Header height={70} p="md">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                  <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size="sm"
                    color={theme.colors.gray[6]}
                    mr="xl"
                  />
                </MediaQuery>

                <Text>Application header</Text>
              </div>
            </Header>
          }
        >
          <Component {...pageProps} />
        </AppShell>
      </MantineProvider>
    </Provider>
  );
}

export default MyApp;
