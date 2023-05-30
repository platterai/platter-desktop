import { ColorModeScript, ChakraProvider } from "@chakra-ui/react";
import theme from "./util/theme";
import React from "react";

import "@fontsource/manrope/500.css";
import "@fontsource/manrope/700.css";
import "@fontsource/inter/100.css";
import "@fontsource/inter/200.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";
import "./global.css";
import "./tailwind.css";

const Root = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </>
  );
};

export default Root;
