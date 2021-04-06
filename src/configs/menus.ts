
/**
 * 应用左侧的导航栏配置
 */
import { lazy } from 'react';
import {
  RightCircleOutlined, AppstoreAddOutlined, FormOutlined,
} from '@ant-design/icons';
import { routerPath } from './constant';
import DemoTodoList from 'pages/_DemoTodoList';
import DemoTemplate from 'pages/_DemoTemplate';

const ADemoPage = lazy(() => import('pages/Home'));
const BDemoPage = lazy(() => import('pages/_DemosForLearn'));

export interface IMenuItem {
  path: string;
  exact?: boolean;
  /**
   * 是否在边栏里展示，默认是true
   * 为false时，只是菜单里看不到入口了，通过路由依然能访问
   */
  showInSider?: boolean;
  /**
   * 菜单对应的页面组件
   */
  Component: React.MemoExoticComponent<(props: any) => JSX.Element> | React.LazyExoticComponent<React.MemoExoticComponent<(props: any) => JSX.Element>>,
  /**
   * 页面组件头部是否出现面包屑，提示用户当前所处的页面路径
   * 默认值：true
   */
  showBreadcrumb?: boolean;
  /**
   * 页面组件是否包一层统一的默认布局组件
   * 默认值：true
   */
  setContentLayout?: boolean;
  label: string;
  Icon?: React.SFC;
  /** 是否是首页，匹配路径 / 时也能访问，默认 false */
  isHomePage?: boolean;
}

export interface IMenuGroup {
  /** 用于辅助计算 menu是否展开 */
  key: string;
  label: string;
  Icon?: React.SFC;
  children: IMenuItem[];
}

const showDevPage = process.env.REACT_APP_IS_LOCAL === 'true';
const showUnderLocalMode = window.location.port !== '';

const menus: Array<IMenuItem | IMenuGroup> = [
  {
    showInSider: showUnderLocalMode,
    label: 'todoList',
    path: '/todolist',
    Component: DemoTodoList,
    // setContentLayout: false,
    // showBreadcrumb: false,
  },
  {
    label: 'template',
    path: '/template',
    Component: DemoTemplate,
  },
  {
    label: '分步表单',
    path: '/step-form',
    Component: lazy(() => import('pages/AStepForm')),
  },
  {
    key: 'someExamples',
    label: '一些示例',
    Icon: AppstoreAddOutlined,
    children: [
      {
        Icon: FormOutlined,
        label: '简单列表',
        path: routerPath.DEMO,
        Component: ADemoPage,
        isHomePage: true,
      },
      {
        Icon: RightCircleOutlined,
        label: '计数器',
        path: '/somelist',
        Component: BDemoPage,
      },
      {
        Icon: RightCircleOutlined,
        label: 'useSteup',
        path: routerPath.DEMO_USE_SETUP,
        Component: lazy(() => import('pages/_DemoUseSetup')),
      },
    ],
  },
];

export default menus;
