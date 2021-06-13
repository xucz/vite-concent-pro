import { run } from 'concent';
import * as models from '../../src/models';
import { act } from 'react-dom/test-utils';
// 避免单测时的右侧情况发生：【未提升到顶层导出的组件，它的每个子组件测试时都需要独立引一下model文件】
// import '../../src/pages/xxxxComp/model';

run(models, {
  log: false, // jest执行时，不打印concent内部的日志输出
  act, // 配合jest执行setState时能触发组件重渲染，see https://reactjs.org/docs/test-utils.html#act
});
