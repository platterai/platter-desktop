import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { buttonTheme } from "./chakratheme/button";
import { modalTheme } from "./chakratheme/modal";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const Theme: ITheme = {
  fonts: {
    heading: `'Manrope', sans-serif`,
    body: `'Manrope', sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: "none",
        // bg: "#141718",
      },
    },
  },
  colors: {
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
    primary: {
      1: "#0084FF",
      2: "#3FDD78",
      3: "#0977de",
    },
    accent: {
      1: "#D84C10",
      2: "#3E90F0",
      3: "#8E55EA",
      4: "#8C6584",
      5: "#DDA73F",
      6: "#5bc782",
      7: "#44ab69",
      8: "#bf430d",
    },
    n: {
      1: "#FEFEFE",
      2: "#F3F5F7",
      3: "#E8ECEF",
      4: "#6C7275",
      5: "#343839",
      6: "#232627",
      7: "#141718",
    },
    g: {
      1: "#F3F5F7",
    },
  },
  components: { Modal: modalTheme, Button: buttonTheme },
};

export const theme = extendTheme({
  config,
  ...Theme,
});

export default theme;
