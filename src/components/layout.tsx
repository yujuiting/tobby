import {
  Grid,
  GridItem,
  Heading,
  Link,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import ConnectWallet from "components/connect-wallet";
import SignInButton from "./signin-button";

export default function Layout({ children }: { children?: React.ReactNode }) {
  function renderHeader() {
    return (
      <Stack direction="row" paddingTop={2} background="Background">
        <Link>
          <Heading variant="gradient-text">Tobby</Heading>
        </Link>
        <Spacer />
        <ConnectWallet />
        <SignInButton />
      </Stack>
    );
  }

  function renderSidebar() {
    return (
      <Stack position="sticky" top="64px">
        <Link>Hot Items</Link>
        <Link>Supplies</Link>
        <Link>3C</Link>
      </Stack>
    );
  }

  function renderFooter() {
    return (
      <Stack direction="row" width="100%" justifyContent="space-between">
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
      templateColumns="repeat(5, 1fr)"
      maxWidth="960px"
      minHeight="100vh"
      marginX="auto"
    >
      <GridItem colSpan={5} position="sticky" top={0}>
        {renderHeader()}
      </GridItem>
      <GridItem colSpan={1}>{renderSidebar()}</GridItem>
      <GridItem colSpan={4}>{children}</GridItem>
      <GridItem colSpan={5}>{renderFooter()}</GridItem>
    </Grid>
  );
}
