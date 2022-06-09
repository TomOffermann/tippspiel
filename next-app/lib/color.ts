import { ColorPalette, computeColorPalette } from "./colorPalette";
import { ApplicationState } from "./context";

function getColorMode(): boolean {
  let colorMode = window.localStorage.getItem("colorMode");
  if (colorMode !== null) {
    if (colorMode === "dark") return true;
    if (colorMode === "light") return false;
    return true;
  }
  return true;
}

function setColorMode(
  mode: boolean,
  ctx: {
    state: ApplicationState;
    update: React.Dispatch<React.SetStateAction<ApplicationState>>;
  }
): void {
  window.localStorage.setItem("colorMode", mode ? "dark" : "light");
  const newState: ApplicationState = {
    style: {
      isDark: mode,
      setColorMode: setColorMode,
      colorPalette: computeColorPalette(mode),
    },
    loggedIn: ctx.state.loggedIn,
    data: ctx.state.data,
  };
  ctx.update(newState);
}

export interface Color {
  isDark: boolean;
  setColorMode: (
    mode: boolean,
    ctx: {
      state: ApplicationState;
      update: React.Dispatch<React.SetStateAction<ApplicationState>>;
    }
  ) => void;
  colorPalette: ColorPalette;
}

export const defaultColor: Color = {
  isDark: true,
  setColorMode: setColorMode,
  colorPalette: computeColorPalette(true),
};

export const useColor = (): Color => {
  let isDark = getColorMode();
  return {
    isDark: isDark,
    setColorMode,
    colorPalette: computeColorPalette(isDark),
  };
};

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    var hue2rgb = function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  (r /= 255), (g /= 255), (b /= 255);
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h, s, l];
}

export const tweak = (color: string, amount: number): string => {
  if (color.length !== 7) {
    throw Error("Color has to be in format: #RRGGBB!");
  }
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  const hsl = rgbToHsl(r, g, b);
  hsl[2] *= amount;
  return (
    "#" +
    hslToRgb(...hsl)
      .map((e) => e.toString(16))
      .join("")
  );
};
