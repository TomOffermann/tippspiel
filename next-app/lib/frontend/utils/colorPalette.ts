export interface ColorPalette {
  background: "#2b2e3d" | "#f1e8e4";
  interface: "#3b3f54" | "#ded5d1";
  primary: "#3ba87d" | "#348a6c";
  secondary: "#b597c4" | "#998fb3";
  error: "#f94044";
  text: "#f1e8e4" | "#4a4e69";
  textOnPrimary: ColorPalette["background"];
  textOnError: "#f1e8e4";
}

const light: ColorPalette = {
  background: "#f1e8e4",
  interface: "#ded5d1",
  primary: "#348a6c",
  secondary: "#998fb3",
  error: "#f94044",
  text: "#4a4e69",
  textOnPrimary: "#f1e8e4",
  textOnError: "#f1e8e4",
};

const dark: ColorPalette = {
  background: "#2b2e3d",
  interface: "#3b3f54",
  primary: "#3ba87d",
  secondary: "#b597c4",
  error: "#f94044",
  text: "#f1e8e4",
  textOnPrimary: "#2b2e3d",
  textOnError: "#f1e8e4",
};

export function computeColorPalette(colorMode: boolean): ColorPalette {
  return colorMode ? dark : light;
}
