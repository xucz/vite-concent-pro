
### 概述
单文件组织 model，适用于逻辑不复杂的 model

推荐使用多文件组织的model，见 `Counter-ModelOneFile/model`


## 是否需要在 src/model里 暴露模块
如不想在 index.ts 文件的第一行写 `import './models'` 来保证模块被加载，只需在 `src/model/index.ts` 里集中暴露模块即可
让`configs/runConcent.ts` 来触发所有模块的加载

### 读取模块计算结果
多文件的model 可以直接读取 meta里的IAC类型赋值 actionCtx，但是单文件里这样做会照成循环引用，
不过可调用 getModuleComputed 拿到模块计算结果
```ts
import { defineModule } from 'concent';
import * as timerUtil from 'utils/timer';
import { getModuleComputed } from './meta';

const m = defineModule({
  state: () => (/***/),
  reducer: {
    readCu(payload, moduleState, actionCtx) {
      const cu = getModuleComputed(); // 读取到模块计算结果
      return { small: cu.small + 1 };
    },
  },
  computed: { /***/ },
});
```
