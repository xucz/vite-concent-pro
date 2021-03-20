/**
 * -----------------------------------------------------------------------------------------
 * 对接antd message模块，防止频繁调用时出现相同内容的提示
 * -----------------------------------------------------------------------------------------
 */
import { message } from 'antd';

/**
 * key: ${method}_${content}
 * 缓存对应方法的提示回调
 */
const key2tipTimer = {} as Record<string, any>;
const validMethods = ['info', 'error', 'success', 'warn', 'warning'] as const;
const NO_DUP_DURATION = 1200;

type MsgType = import('antd/lib/message').MessageType | 'ignored';
type Methods = typeof validMethods[number];
/** 单位：s，提示展现多少s后消失 */
type DisplayDuration = number;
/** 单位：ms, 该指定毫秒时间内出现的重复提示会被忽略掉，小于0时无该规则 */
type NoDupDuration = number;

function _callMessageMethod(method: Methods, cb: (arg: any) => void, content: React.ReactNode, displayDuration: DisplayDuration, noDupDuration: NoDupDuration) {
  if (!validMethods.includes(method)) {
    console.error(`messageService call invalid method[${method}]`);
    return cb('ignored');
  }

  // 直接提示，无重复校验规则
  if (noDupDuration < 0) {
    return cb(message[method](content, displayDuration));
  }

  const key = `${method}_${content}`;
  const tipTimer = key2tipTimer[key];
  if (tipTimer) {
    // 忽略本次提示
    return cb('ignored');
  }

  key2tipTimer[key] = setTimeout(() => {
    delete key2tipTimer[key];
  }, noDupDuration);

  cb(message[method](content, displayDuration));
}

/**
 * 通用的提示方式，动态传参决定提示类型
 */
export function call(method: Methods, content: React.ReactNode, displayDuration: DisplayDuration = 3,
                     noDupDuration: NoDupDuration = NO_DUP_DURATION
) {
  return new Promise((resolve) => {
    _callMessageMethod(method, resolve, content, displayDuration, noDupDuration);
  }) as Promise<MsgType>;
}

/**
 * 普通提示
 */
export function info(content: React.ReactNode, displayDuration: DisplayDuration = 3, noDupDuration: NoDupDuration = NO_DUP_DURATION) {
  return new Promise((resolve) => {
    _callMessageMethod('info', resolve, content, displayDuration, noDupDuration);
  });
}

/**
 * 错误提示
 */
export function error(content: React.ReactNode, displayDuration: DisplayDuration = 3, noDupDuration: NoDupDuration = NO_DUP_DURATION) {
  return new Promise((resolve) => {
    _callMessageMethod('error', resolve, content, displayDuration, noDupDuration);
  });
}

/**
 * 成功提示
 */
export function success(content: React.ReactNode, displayDuration: DisplayDuration = 3, noDupDuration: NoDupDuration = NO_DUP_DURATION) {
  return new Promise((resolve) => {
    _callMessageMethod('success', resolve, content, displayDuration, noDupDuration);
  });
}

/**
 * 警告提示
 */
export function warn(content: React.ReactNode, displayDuration: DisplayDuration = 3, noDupDuration: NoDupDuration = NO_DUP_DURATION) {
  return new Promise((resolve) => {
    _callMessageMethod('warn', resolve, content, displayDuration, noDupDuration);
  });
}

/**
 * 警告提示
 */
export function warning(content: React.ReactNode, displayDuration: DisplayDuration = 3, noDupDuration: NoDupDuration = NO_DUP_DURATION) {
  return new Promise((resolve) => {
    _callMessageMethod('warning', resolve, content, displayDuration, noDupDuration);
  });
}
