
export const siderWidth = 200;
export const siderWidthPx = `${siderWidth}px`;
/** 最底层的背景色 */
export const buttomBgColor = '#f0f2f5';
export const contentBgColor = '#fff';
export const siteThemeColor = '#1976d2';

const img1 = 'https://raw.githubusercontent.com/fantasticsoul/assets/master/c2pro/c2pro-banner.png';
// 展开时两种主题色的logo长图设置，可按实际情况填写不同的url，如无素材填写0长字符串，保证 notCollapsedLogoLabel 有文案即可
/** 展开时浅色主题长图 */
export const notCollapsedLogoImg = img1;
/** 展开时深色主题长图 */
export const notCollapsedLogoImgOfDark = img1;
/** 无 notCollapsedLogoImg 或 notCollapsedLogoImgOfDark 时，系统兜底采用的短文案，用于折叠边栏时显示 */
export const notCollapsedLogoLabel = 'xxx系统';

const img2 = 'https://raw.githubusercontent.com/fantasticsoul/assets/master/c2pro/short_logo.png';
// 折叠时两种主题色的logo短图设置，可按实际情况填写不同的url，如无素材填写0长字符串，保证 collapsedLogoLabel 有文案即可
/** 折叠时浅色主题短图 */
export const collapsedLogoImg = img2;
/** 折叠时深色主题短图 */
export const collapsedLogoImgOfDark = img2;
/** 无 collapsedLogoImg 或 collapsedLogoImgOfDark 时，系统兜底采用的短文案，用于折叠边栏时显示 */
export const collapsedLogoLabel = '酷炫';

export const img404 = '404_img_url';
export const img403 = '403_img_url';

export const LS_C2PRO_SETTINGS = 'C2ProSettings';
export const LS_C2PRO_SETTINGS_VER = 'C2ProSettingsVer';

export enum TopHeaderTypes {
  FIXED = '1',
  FLOWED = '2',
  HIDDEN = '3',
};

export enum TopNavBarTypes {
  FIXED = '1',
  FLOWED = '2',
  HIDDEN = '3',
};

export enum SiderViewTypes {
  COLLAPSED = '1',
  NOT_COLLAPSED = '2',
  HIDDEN = '3',
};
