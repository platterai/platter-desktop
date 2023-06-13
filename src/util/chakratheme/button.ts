import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const colors = {
  primary: {
    1: "#0084FF",
    2: "#3FDD78",
    3: "#0977de",
    4: "#e1effc",
  },
};

const solid = defineStyle({
  bg: colors.primary[`1`],
  color: "white",
  _hover: {
    bg: colors.primary[`3`],
  },
});

const outline = defineStyle({
  border: "2px solid",
  borderColor: colors.primary[`1`],
  color: colors.primary[`1`],
  _hover: {
    bg: colors.primary[`4`],
  },
});

const ghost = defineStyle({
  color: colors.primary[`1`],
  _hover: {
    bg: colors.primary[`4`],
  },
});

const link = defineStyle({
  color: colors.primary[`1`],
  _hover: {
    textDecoration: `underline solid ${colors.primary[`1`]}`,
  },
});

export const buttonTheme = defineStyleConfig({
  variants: { solid, outline, ghost, link },
});
