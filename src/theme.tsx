import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const theme = extendTheme({
  colors: {
    Background: "#3E4C6E",
    brand: {
      50: "#ebf1ff",
      100: "#ccd4e7",
      200: "#acb8d2",
      300: "#8d9cbf",
      400: "#6d7fab",
      500: "#546692",
      600: "#404f72",
      700: "#2d3853",
      800: "#1a2234",
      900: "#050b18",
    },
  },
  fonts,
  breakpoints,
  styles: {
    global: {
      body: {
        color: "#E6EDF3",
        minHeight: "100vh",
        "&:before": {
          content: "''",
          display: "block",
          background: "linear-gradient(#3E4C6E 0%, #28314C 100%)",
          position: "fixed",
          width: "100vw",
          height: "100vh",
          bottom: 0,
          left: 0,
          zIndex: -1,
        },
      },
    },
  },
  components: {
    Link: {
      baseStyle: {
        transition: "all .2s",
        transform: "scale(1)",
        display: "block",
        _hover: {
          transform: "scale(1.02)",
          textDecoration: "none",
          filter: "opacity(0.5)",
        },
      },
    },
    Heading: {
      variants: {
        "gradient-text": {
          background: "linear-gradient(to right, #947FEE 0%, #F674B5 100%)",
          backgroundClip: "text",
        },
      },
    },
  },
});

export default theme;
