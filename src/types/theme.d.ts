interface IThemeFonts {
  heading: string;
  body: string;
}

interface IThemeGlobalStyles {
  body: {
    bg: string;
  };
}

interface IThemeColors {
  [key: string]: {
    [key: number]: string;
  };
}

interface IThemeComponents {
  [key: string]: any; // You can replace 'any' with specific component type if available
}

interface ITheme {
  fonts: ThemeFonts;
  styles: {
    global: ThemeGlobalStyles;
  };
  colors: ThemeColors;
  components: ThemeComponents;
}
