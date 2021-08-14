import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { AppProps } from "next/app";
import theme from "theme";
import store from "store";
import Layout from "components/layout";
import useAutoSignIn from "hooks/useAutoSignIn";
import useEnsureUserVerified from "hooks/useEnsureUserVerified";

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
  return (
    <Provider store={store}>
      <ChakraProvider resetCSS theme={theme}>
        <App {...props} />
      </ChakraProvider>
    </Provider>
  );
}

export default AppWithProviders;
