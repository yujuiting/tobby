import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import theme from "theme";
import store from "store";
import Layout from "components/layout";
import useAutoSignIn from "hooks/useAutoSignIn";
import useEnsureUserVerified from "hooks/useEnsureUserVerified";

const UseWalletProvider = dynamic(async () => {
  const { UseWalletProvider: OriginalUseWalletProvider } = await import(
    "use-wallet"
  );
  return function UseWalletProvider({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <OriginalUseWalletProvider connectors={{}}>
        {children}
      </OriginalUseWalletProvider>
    );
  };
});

function App({ Component, pageProps }: AppProps) {
  useAutoSignIn();

  useEnsureUserVerified();

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

function AppWithProviders(props: AppProps) {
  const child = (
    <Provider store={store}>
      <ChakraProvider resetCSS theme={theme}>
        <App {...props} />
      </ChakraProvider>
    </Provider>
  );

  if (!process.browser) return child;

  return <UseWalletProvider>{child}</UseWalletProvider>;
}

export default AppWithProviders;
