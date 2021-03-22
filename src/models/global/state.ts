
import { SiderTheme } from 'antd/lib/layout/Sider';

function getInitialState() {
  return {
    siderVisible: true,
    siderTheme: 'dark' as SiderTheme,
    headerTheme: 'dark' as SiderTheme,
    /** 站点的主题颜色 */
    themeColor: '#8B572A',
    someInfo: 'overWrite built-in module global\'s state',

    /** 系统是否准备就绪，包括登录、配置数据拉取等动作完成才是就绪 */
    isAppReady: false,
    userName: '',
    uesrIcon: '',
    /** 当前登录者是否是管理员 */
    isAdmin: false,
  };
}

export type St = ReturnType<typeof getInitialState>;

export default getInitialState;
