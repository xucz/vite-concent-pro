// 需要全局共享的model，提升到这里导出
// 然后全局可以使用 services/concent 里的 useC2Mode(modName) 来拿到目标模块了
import { DEMO_CLONED } from 'configs/c2Mods';
import globalModel from './global';
import demoModel from './_demo';
import counterModel from 'components/_demos/CounterWithModel/model';
import todoListModel from 'pages/_DemoTodoList/model';
import homeModel from 'pages/Home/model';

const demoCloned = {
  [DEMO_CLONED]: demoModel.DemoModel,
};

const allModels = {
  // ...globalModel,
  // ...counterModel,
  // ...demoModel,
  // ...demoCloned,
  // ...homeModel,
  // ...todoListModel,
};

export default allModels;
