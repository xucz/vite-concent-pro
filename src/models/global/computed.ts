import { St } from './state';
import { sys } from 'configs/constant';

const {
  TopHeaderTypes: th, TopNavBarTypes: tn, SiderViewTypes, siderWidthPx,
  collapsedLogoImg, collapsedLogoImgOfDark, collapsedLogoLabel,
  notCollapsedLogoImg, notCollapsedLogoImgOfDark, notCollapsedLogoLabel,
} = sys;
const { HIDDEN, COLLAPSED, NOT_COLLAPSED } = SiderViewTypes;

const viewType2LeftValue = {
  [HIDDEN]: '0',
  [COLLAPSED]: '48px',
  [NOT_COLLAPSED]: siderWidthPx,
};
const logoKey2ImgUrlList = {
  [`light_${SiderViewTypes.COLLAPSED}`]: [collapsedLogoImg, collapsedLogoImgOfDark],
  [`light_${SiderViewTypes.NOT_COLLAPSED}`]: [notCollapsedLogoImg, notCollapsedLogoImgOfDark],
  [`light_${SiderViewTypes.HIDDEN}`]: [notCollapsedLogoImg, notCollapsedLogoImgOfDark],
  [`dark_${SiderViewTypes.COLLAPSED}`]: [collapsedLogoImgOfDark, collapsedLogoImg],
  [`dark_${SiderViewTypes.NOT_COLLAPSED}`]: [notCollapsedLogoImgOfDark, notCollapsedLogoImg],
  [`dark_${SiderViewTypes.HIDDEN}`]: [notCollapsedLogoImgOfDark, notCollapsedLogoImg],
};
const paddingTopMap = {
  [`${th.FIXED}_${tn.FIXED}`]: '80px',
  [`${th.FIXED}_${tn.FLOWED}`]: '0',
  [`${th.FIXED}_${tn.HIDDEN}`]: '48px',
  [`${th.FLOWED}_${tn.FIXED}`]: '0',
  [`${th.FLOWED}_${tn.FLOWED}`]: '0',
  [`${th.FLOWED}_${tn.HIDDEN}`]: '0',
  [`${th.HIDDEN}_${tn.FIXED}`]: '32px',
  [`${th.HIDDEN}_${tn.FLOWED}`]: '0',
  [`${th.HIDDEN}_${tn.HIDDEN}`]: '0',
};
const headerStyleMap = {
  [`${th.FIXED}_${tn.FIXED}`]: { zIndex: 6, position: 'fixed' as const, left: '0', right: '0' },
  [`${th.FIXED}_${tn.FLOWED}`]: { zIndex: 6, position: 'fixed' as const, left: '0', right: '0' },
  [`${th.FIXED}_${tn.HIDDEN}`]: { zIndex: 6, position: 'fixed' as const, left: '0', right: '0' },
  [`${th.FLOWED}_${tn.FIXED}`]: { marginTop: '32px' },
  [`${th.FLOWED}_${tn.FLOWED}`]: {},
  [`${th.FLOWED}_${tn.HIDDEN}`]: {},
  [`${th.HIDDEN}_${tn.FIXED}`]: { display: 'none' },
  [`${th.HIDDEN}_${tn.FLOWED}`]: { display: 'none' },
  [`${th.HIDDEN}_${tn.HIDDEN}`]: { display: 'none' },
};
const navBarStyleMap = {
  [`${th.FIXED}_${tn.FIXED}`]: { position: 'fixed' as const, left: '0', right: '0', top: '48px' },
  [`${th.FIXED}_${tn.FLOWED}`]: { marginTop: '48px' },
  [`${th.FIXED}_${tn.HIDDEN}`]: { display: 'none' },
  [`${th.FLOWED}_${tn.FIXED}`]: { position: 'fixed' as const, left: '0', right: '0', top: '0' },
  [`${th.FLOWED}_${tn.FLOWED}`]: {},
  [`${th.FLOWED}_${tn.HIDDEN}`]: { display: 'none' },
  [`${th.HIDDEN}_${tn.FIXED}`]: { position: 'fixed' as const, left: '0', right: '0', top: '0' },
  [`${th.HIDDEN}_${tn.FLOWED}`]: {},
  [`${th.HIDDEN}_${tn.HIDDEN}`]: { display: 'none' },
};


export function isHeaderAboveNavBar(n: St) {
  const { topHeaderType, topNavBarType } = n;
  if (topHeaderType === th.FLOWED && topNavBarType === tn.FIXED) {
    return false;
  }
  return true;
}

/**
 * MainContent 组件根节点样式
 */
export function contentLayoutStyle(n: St): React.CSSProperties {
  const { siderViewType, topHeaderType, topNavBarType } = n;
  // 给一个最小高度，确保路由组件在异步加载过程中，Footer出现在底部
  const minHeight = 'calc(100vh - 45px)';
  const paddingTop = paddingTopMap[`${topHeaderType}_${topNavBarType}`];
  return { marginLeft: viewType2LeftValue[siderViewType], paddingTop, minHeight, overflowX: 'auto' };
}

/**
 * 顶部区域头部信息的布局样式
 */
export function headerStyle(n: St): React.CSSProperties {
  const { headerTheme, siderViewType, topHeaderType, topNavBarType } = n;
  const color = headerTheme === 'dark' ? 'white' : 'var(--theme-color)';
  const backgroundColor = headerTheme === 'dark' ? '#001529' : 'white';
  const marginLeft = viewType2LeftValue[siderViewType];
  const toReturn = { marginLeft, backgroundColor, color, zIndex: 4 };
  return { ...toReturn, ...headerStyleMap[`${topHeaderType}_${topNavBarType}`] };
}

/**
 * 顶部区域导航条的布局样式
 */
export function quickNavBarStyle(n: St): React.CSSProperties {
  const { siderViewType, topHeaderType, topNavBarType } = n;
  // 对于快捷导航条来说，不使用 marginLeft 方式来做导航条内容和边栏内容不重叠的效果
  // 是为了考虑到导航条里的子元素使用 absolute 属性时能够配合导航条自身的 relative 正常工作
  // 如使用 marginLeft，子元素 absolute 的同时设置的 right 等值会让子元素显示在导航条外部
  const paddingLeft = viewType2LeftValue[siderViewType];
  const toReturn = { boxSizing: 'border-box' as const, paddingLeft, zIndex: 5 };
  return { ...toReturn, ...navBarStyleMap[`${topHeaderType}_${topNavBarType}`] };
}

export function siderStyle(n: St): React.CSSProperties {
  const { siderTheme, siderViewType } = n;
  // 该颜色控制 settingIcon 在 header 里显示的颜色，会受是否暗黑主题色影响
  const backgroundColor = siderTheme === 'dark' ? '#001529' : 'white';
  let width = '0px';
  if (siderViewType === COLLAPSED) {
    width = '48px';
  } else if (siderViewType === NOT_COLLAPSED) {
    width = sys.siderWidthPx;
  }
  return { backgroundColor, width };
}

/**
 * 设置按钮的展示或样式控制
 */
export function settingIconCtrl(n: St) {
  const { topHeaderType, topNavBarType, headerTheme } = n;
  // 该颜色控制 settingIcon 在 header 里显示的颜色，会受是否暗黑主题色影响
  const color = headerTheme === 'dark' ? 'white' : 'var(--theme-color)';
  let toReturn = { showInHeader: false, showInBar: false, showInBody: true, color };
  if (topHeaderType !== th.HIDDEN) {
    toReturn = { showInHeader: true, showInBar: false, showInBody: false, color };
  }
  if (topHeaderType === th.HIDDEN && topNavBarType !== tn.HIDDEN) {
    toReturn = { showInHeader: false, showInBar: true, showInBody: false, color };
  }
  // 在body或bar中展示的话，颜色一定是主题色
  if (toReturn.showInBody || toReturn.showInBar) toReturn.color = 'var(--theme-color)';
  return toReturn;
}

/**
 * 计算控制logo显示的各种参数
 */
export function logoCtrl(n: St) {
  const { siderTheme, headerTheme, siderViewType } = n;
  const toReturn = { showLabel: false, label: '', imgUrl: '', color: '', width: '0px' };

  const setShowLabel = () => {
    let label = siderViewType === SiderViewTypes.COLLAPSED ? collapsedLogoLabel : notCollapsedLogoLabel;
    toReturn.showLabel = true;
    toReturn.label = label || 'My System';
  };

  let themeValue = headerTheme;
  toReturn.width = siderWidthPx;
  if ([SiderViewTypes.COLLAPSED, SiderViewTypes.NOT_COLLAPSED].includes(siderViewType)) {
    themeValue = siderTheme;
    toReturn.width = siderViewType === COLLAPSED ? '48px' : siderWidthPx;
  }
  // 文字型 logo 的字体颜色
  const color = themeValue === 'dark' ? 'white' : 'var(--theme-color)';
  toReturn.color = color;

  const imgUrlList = logoKey2ImgUrlList[`${themeValue}_${siderViewType}`];
  if (!imgUrlList) {
    setShowLabel();
  }
  const imgUrl = imgUrlList[0] || imgUrlList[1];
  if (!imgUrl) {
    setShowLabel();
  } else {
    toReturn.imgUrl = imgUrl;
  }

  return toReturn;
}

interface ISiderInfo {
  iconDes: 'left' | 'right';
  /** 边栏是否是展开的，true：展开，false：折叠 */
  isUnfold: boolean;
  /** 边栏是否可见，true：可见，false：不可见 */
  showSider: boolean;
}
export function siderInfo(n: St): ISiderInfo {
  const { siderViewType } = n;
  const iconDes = siderViewType === HIDDEN ? 'right' : 'left';
  const isUnfold = siderViewType === NOT_COLLAPSED;
  const showSider = siderViewType !== HIDDEN;
  return { iconDes, isUnfold, showSider };
}

export function siderThemeSwitchChecked(n: St) {
  const { siderTheme } = n;
  return siderTheme === 'dark';
}

export function headerThemeSwitchChecked(n: St) {
  const { headerTheme } = n;
  return headerTheme === 'dark';
}

export function navBarItemCls(n: St) {
  return n.isTabPaneHeavyBg ? 'quickNavBarWrap' : 'quickNavBarLightWrap';
}
