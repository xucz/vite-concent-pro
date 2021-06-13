import { defWatch } from 'concent';
import { LS_C2PRO_SETTINGS } from 'configs/constant/sys';
import { St } from './meta';

// 记录关系的设置变化，方便用户刷新后，恢复最近的设置
export const settingsKeyChange = defWatch<St>((n, o, f) => {
  const {
    siderViewType, siderViewTypeBackup, topHeaderType, topNavBarType, curActiveRoutePath,
    curActiveRouteFullPath, activeRoutePaths,
    themeColor, headerTheme, siderTheme, custThemeColor, fontAlpha, isTabPaneHeavyBg,
  } = n;
  if (f.isFirstCall) return;

  const str = JSON.stringify({
    siderViewType, siderViewTypeBackup, topHeaderType, topNavBarType, curActiveRoutePath,
    curActiveRouteFullPath, activeRoutePaths,
    themeColor, headerTheme, siderTheme, custThemeColor, fontAlpha, isTabPaneHeavyBg,
  });
  localStorage.setItem(LS_C2PRO_SETTINGS, str);
}, { immediate: true });
