import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { AppProps } from "next/app";
import theme from "theme";
import store from "store";
import Layout from "components/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider resetCSS theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
