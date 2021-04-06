import Color from 'color';

function privSetColor(key: string, val: string) {
  if (window.document) {
    window.document.documentElement.style.setProperty(key, val);
  }
}

export function getThemeColorLight(themeColor: string, lighten: number = 0.8) {
  const c = new Color(themeColor);
  const themeColorLight = c.lighten(lighten).hex();
  return themeColorLight;
}

export function changeThemeColor(themeColor: string) {
  privSetColor('--theme-color', themeColor);
}

export function changeThemeColorLight(themeColorLight: string) {
  privSetColor('--theme-color-light', themeColorLight);
}
