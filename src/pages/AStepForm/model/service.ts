/**
 * ------------------------------------
 *  model service
 * ------------------------------------
 */
import { St } from './meta';
import regs from 'utils/regs';
import * as objUtil from 'utils/obj';


function checkObject(toCheckObj: Record<string, any>) {
  const errors = {} as Record<string, string>;
  objUtil.okeys(toCheckObj).forEach((key) => {
    const tkey = key as keyof typeof toCheckObj;
    errors[key] = checkers[key](toCheckObj[tkey]);
  });
  return errors;
}



export const oriCheckers = {
  appId(appId: string) {
    if (!appId) {
      return 'appId未填写';
    } else if (!regs.num1to9.test(appId)) {
      return 'appId格式只能是0到9的数字';
    }
    return '';
  },
  monitor(monitor: string[]) {
    if (monitor.length === 0) {
      return '负责人未选择';
    }
    return '';
  },
  dataExample(value: string) {
    let error = '';
    let json = null;
    try {
      json = JSON.parse(value);
    } catch (err) {
      error = '示例数据json格式不合法';
    }

    if (json) {
      if (objUtil.isDepthLargeThan(json, 3)) {
        error = '示例数据json层级过深，大于3层';
      }
    }
    return error;
  },
  defaultRule(val: string) {
    return (val === '' || val === null || val === undefined) ? '未填写' : '';
  }
}

/**
 * 各个字段的检查函数，取不到检查函数的就走默认检查规则函数 defaultRule
 */
export const checkers = new Proxy(oriCheckers, {
  get(target, key) {
    const targetObj = target as any;
    const fn = targetObj[key];
    if (fn) return fn;
    return target.defaultRule;
  },
}) as typeof oriCheckers & { [key: string]: (val: string | string[]) => string };

export function checkStep1(moduleState: St) {
  const { appId, appDetail, displayName, comment, monitor } = moduleState;
  const toCheckObj = { appId, appDetail, displayName, comment, monitor };
  return checkObject(toCheckObj);
}

/**
 * 检查数据源填写页表单提交的信息
 */
export function checkStep2(moduleState: St) {
  const { dataExample, dataExampleJson, dbType } = moduleState;
  // DataInput 控件会始终将填写的字符串同步到 dataExample
  // 如果完全没有填写过，dataExample才会为空字符串
  // 此时才从 dataExampleJson 里序列化
  const targetJsonStr = dataExample || JSON.stringify(dataExampleJson);
  return checkObject({ dataExample: targetJsonStr, dbType });
}

