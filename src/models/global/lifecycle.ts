import { IDispatch } from 'concent';
import { St } from './state';
import * as rd from './reducer';
import * as staffServ from 'services/staff';

export function loaded(dispatch: IDispatch, moduleState: St) {
  const { themeColor } = moduleState;
  // 写入当前配置主题色
  dispatch(rd.changeThemeColor, themeColor);

  staffServ.initData();
}
