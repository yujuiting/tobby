import NextLink from "next/link";
import {
  Grid,
  GridItem,
  Heading,
  Link,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
// import ConnectWallet from "components/connect-wallet";
import SignInButton from "./signin-button";

export default function Layout({ children }: { children?: React.ReactNode }) {
  function renderHeader() {
    return (
      <Stack
        direction="row"
        paddingTop={2}
        background="Background"
        boxShadow="0px 0px 24px 12px var(--chakra-colors-Background)"
      >
        <NextLink href="/">
          <Link>
            <Heading variant="gradient-text">Tobby</Heading>
          </Link>
        </NextLink>
        <Spacer />
        {/* <ConnectWallet /> */}
        <SignInButton />
      </Stack>
    );
  }

  function renderFooter() {
    return (
      <Stack
        direction={["column", "row"]}
        spacing={[8, 4]}
        width="100%"
        justifyContent="space-between"
      >
        <Stack>
          <Link>
            <Heading variant="gradient-text">Tobby</Heading>
          </Link>
          <Text>Tobby is an awesome engineer.</Text>
          <Link>Team</Link>
        </Stack>
        <Stack>
          <Heading as="h3" size="md">
            SUPPORT
          </Heading>
          <Link>Tutorials</Link>
          <Link>Documentation</Link>
          <Link>Contact Us</Link>
        </Stack>
        <Stack>
          <Heading as="h3" size="md">
            Community
          </Heading>
          <Link>Discord</Link>
          <Link>Twitter</Link>
          <Link>Medium</Link>
        </Stack>
      </Stack>
    );
  }

  return (
    <Grid
      templateRows="64px auto 160px"
      maxWidth="940px"
      minHeight="100vh"
      marginX="auto"
      paddingX="10px"
    >
      <GridItem position="sticky" top={0} zIndex={99}>
        {renderHeader()}
      </GridItem>
      <GridItem paddingBottom={8}>{children}</GridItem>
      <GridItem>{renderFooter()}</GridItem>
    </Grid>
  );
}
