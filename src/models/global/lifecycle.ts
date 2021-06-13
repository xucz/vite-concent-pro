import { IDispatch } from 'concent';
import * as rd from './reducer';
import * as staffServ from 'services/staff';
import * as colorServ from 'services/color';
import { St } from './meta';

export function loaded(dispatch: IDispatch, moduleState: St) {
  const { themeColor, fontAlpha } = moduleState;
  // 写入当前配置主题色
  dispatch(rd.changeThemeColor, { themeColor });
  // 改变颜色无其他逻辑，直接调用 changeFontAlpha 即可
  colorServ.changeFontAlpha(fontAlpha);
  staffServ.initData();
}
