import Color from 'color';

function privSetColor(key: string, val: string) {
  if (window.document) {
    window.document.documentElement.style.setProperty(key, val);
  }
}

export function hex2rgb(hexColor: string) {
  const c = new Color(hexColor);
  const rgb = c.object();
  return rgb;
}

export function hex2rgbString(hexColor: string) {
  const rgb = hex2rgb(hexColor);
  return `${rgb.r}, ${rgb.g}, ${rgb.b}`;
}

export function getThemeColorLight(hexColor: string, lighten: number = 0.6) {
  const c = new Color(hexColor);
  const themeColorLight = c.lighten(lighten).hex();
  return themeColorLight;
}

export function changeThemeColor(hexColor: string) {
  privSetColor('--theme-color', hexColor);
}

export function changeThemeColorLight(themeColorLight: string) {
  privSetColor('--theme-color-light', themeColorLight);
}

export function changeThemeColorRGB(themeColorRGB: string) {
  privSetColor('--theme-color-rgb', themeColorRGB);
}

export function changeFontAlpha(alpha: number) {
  privSetColor('--theme-color-text', `rgba(0, 0, 0, ${alpha / 100})`);
}
