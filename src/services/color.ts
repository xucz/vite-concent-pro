export function changeThemeColor(themeColor: string) {
  if (window.document) {
    window.document.documentElement.style.setProperty('--theme-color', themeColor);
  }
}
