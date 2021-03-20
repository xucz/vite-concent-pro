import { IDispatch } from 'concent';
import { St } from './state';
import * as colorServ from 'services/color';
import * as staffServ from 'services/staff';

export function loaded(dispatch: IDispatch, moduleState: St) {
  const {themeColor} = moduleState;
  // 写入当前配置主题色
  colorServ.changeThemeColor(themeColor);

  staffServ.initData();
}
