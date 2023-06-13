declare module "@mui/material/styles/createPalette" {
  interface Palette {
    platter: {
      black?: string;
      lightWhite?: string;
      darkWhite?: string;
      darkGrey?: string;
    };
  }
  interface PaletteOptions {
    platter: {
      black?: string;
      lightWhite?: string;
      darkWhite?: string;
      darkGrey?: string;
    };
  }
}

export default function createPalette(palette: PaletteOptions): Palette;
