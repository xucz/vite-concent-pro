
import { SiderTheme } from 'antd/lib/layout/Sider';
import * as colorServ from 'services/color';

function getInitialState() {
  const themeColor = '#025232';

  return {
    siderVisible: true,
    siderTheme: 'dark' as SiderTheme,
    headerTheme: 'dark' as SiderTheme,
    /** 站点的主题颜色 */
    themeColor,
    themeColorLight: colorServ.getThemeColorLight(themeColor),
    someInfo: 'overWrite built-in module global\'s state',

    /** 系统是否准备就绪，包括登录、配置数据拉取等动作完成才是就绪 */
    isAppReady: false,
    userName: '',
    uesrIcon: '',
    /** 当前登录者是否是管理员 */
    isAdmin: false,
    /** 处于innerMock时，httpService的请求结果会直接从模拟文件获取（同时还会配合 innerMockApis 名单），注意此时不会从浏览器发出请求 */
    isInnerMock: true,
    /** isInnerMock 为 true 时，在名单里的请求才会直接获取模拟文件的结果 */
    innerMockApis: [
      'get /api/todo/list',
    ],
  };
}

export type St = ReturnType<typeof getInitialState>;

export default getInitialState;
