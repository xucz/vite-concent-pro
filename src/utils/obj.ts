
export function okeys<T extends Record<string, any>>(map: T) {
  // 外部需要自己 as (keyof T)[]
  return Object.keys(map);
}

export function isValidVal(val: any) {
  return val !== undefined && val !== null && val !== '';
}

/**
 * 判断是否是对象 {} []
 * @param {*} val
 */
export function isObject(val: any, allowArr = true) {
  // 防止 typeof null === 'object' 成立
  if (!val) return false;
  if (allowArr) {
    return typeof val === 'object';
  }
  return typeof val === 'object' && !Array.isArray(val);
}

export function clone(obj: Record<string, any>) {
  if (obj) return JSON.parse(JSON.stringify(obj));

  throw new Error('empty object');
  ;
}

export function safeGetItemFromArray<T = any>(arr: T[], idx: number, defaultValue: T) {
  let item = arr[idx];
  if (!item) {
    item = arr[idx] = defaultValue;
  }
  return item;
}

export function safeGet<T = any>(obj: Record<string, any>, key: string, defaultValue: T) {
  let item = obj[key];
  if (!item) {
    item = obj[key] = defaultValue;
  }
  return item;
}

export function safeAssign(obj: Record<string, any>, toMod: Record<string, any> = {}) {
  Object.keys(toMod).forEach((key) => {
    obj[key] = toMod[key];
  });
}

/**
 * 指定了 defaultValue 时才不会抛出解析字符串失败的错误
 * @param jsonStr
 * @param defaultValue
 */
export function safeParse<T = any>(jsonStr: string, defaultValue?: T, errMsg?: string): T {
  try {
    return JSON.parse(jsonStr);
  } catch (err) {
    if (defaultValue) return defaultValue;
    if (errMsg) throw new Error(errMsg);
    throw err;
  }
}

interface NullDef {
  nullValues?: any[];
  /** {} 算不算空，true算空*/
  emptyObjIsNull?: boolean;
  /** 需不需要检查 {a:'', b:'' }, 默认false, 为true时，如果传入的是object，检查所有value算不算空 */
  checkObjValues?: boolean;
  emptyArrIsNull?: boolean;
}
/**
 *
 * @param value
 * @param nullDef
 */
export function isNull(value: any, nullDef: NullDef = {}) {
  const {
    nullValues = [null, undefined, ''], checkObjValues = false,
    emptyObjIsNull = true, emptyArrIsNull = true,
  } = nullDef;

  const inNullValues = nullValues.includes(value);
  if (inNullValues) {
    return true;
  }

  if (Array.isArray(value)) {
    if (emptyArrIsNull) return value.length === 0;
    return false;
  }

  if (typeof value === 'object') {
    const keys = okeys(value);
    const keyLen = keys.length;

    // {a:'', b:'' } 所有子value为空才算空
    if (checkObjValues) {
      let allIsNull = true;
      for (let i = 0; i < keyLen; i++) {
        const subValue = value[keys[i]];
        if (!isNull(subValue)) {
          allIsNull = false;
          break;
        }
      }

      return allIsNull;
    }
    if (emptyObjIsNull) return keyLen === 0;
    return false;
  }

  return false;
}

export function reverseMap(originalMap: Record<string, string | number>) {
  return Object.keys(originalMap).reduce((map, key) => {
    const value = originalMap[key];
    map[value] = key;
    return map;
  }, {} as Record<string, string>);
}

/**
 * 后端有些接口返回空map的格式是数组 [],
 * 但其实期望的是 {},
 * 为了保证上传业务逻辑消费数据的格式一致性，使用此函数做修正
 */
export function ensureMap(obj: Record<string, any>, key: string) {
  if (Array.isArray(obj[key])) {
    obj[key] = {};
  }
}

/**
 * 从一个已存在的map里按规则变异出一个新的map
 * @param map
 * @param getValue
 * @param getKey
 */
export function transformMap(map: Record<string, any>, getValue?: (value: any, key: string) => any, getKey?: (key: string, value: any) => string) {
  const newMap = {} as Record<string, any>;
  const targetGetKey = getKey || (key => key);

  okeys(map).forEach(key => {
    const value = map[key];
    const mapKey = targetGetKey(key, value);
    newMap[mapKey] = getValue ? getValue(value, key) : value;
  });
  return newMap;
}

/**
 * map 转为 list
 * @param map
 * @param keyName
 * @param valueName
 */
export function toList<V, Item>(map: Record<string, V>, getItem: (key: string, value: V) => Item) {
  const list = [] as Item[];
  okeys(map).forEach(key => {
    const item = getItem(key, map[key]);
    list.push(item);
  });
  return list;
}

/**
 * 过滤list，按规则组装新的item后返回一个新的 list
 * @param list
 * @param filterCb
 * @param getNewItem
 */
export function filterList<Item, NewItem>(list: Item[], filterCb: (item: Item) => boolean, getNewItem: (item: Item) => NewItem) {
  const newList = [] as NewItem[];
  list.forEach(item => {
    if (filterCb(item)) newList.push(getNewItem(item));
  });
  return newList;
}

/**
  * 对比新老对象，提取出新对象里发生变化的部分并单独返回
  * 注意此函数只做浅比较
  * @param {object} oldObj
  * @param {object} newObj
  * @param {string} [fixedKeys=[]] - 必定要包含的key
  */
export function extractChangedPart(oldObj: Record<string, any>, newObj: Record<string, any>, fixedKeys: string[] = []) {
  const changed = {} as Record<string, any>;
  const oldObjKeys = okeys(oldObj);
  const newObjKeys = okeys(newObj);
  const traversalKeys = newObjKeys.length > oldObjKeys.length ? newObjKeys : oldObjKeys;

  traversalKeys.forEach(key => {
    const newVal = newObj[key];
    if (fixedKeys.includes(key)) {
      changed[key] = newVal;
      return;
    }
    if (newVal === undefined) return;
    if (oldObj[key] !== newVal) changed[key] = newVal;
  });
  return changed;
}

export function hasProperty(obj: Record<string, any>, property: string) {
  return Object.prototype.hasOwnProperty.call(obj, property);
}


export function purify(obj: Record<string, any>, isValueInvalid?: (val: any) => boolean): Record<string, any> {
  // isValidVal or isNull
  const targetIsInvalid = isValueInvalid || (value => !isNull(value));
  const pureObj = {} as Record<string, any>;
  okeys(obj).forEach(key => {
    if (targetIsInvalid(obj[key])) pureObj[key] = obj[key];
  });
  return pureObj;
}

/**
 * 针对string 或则 number 元素的数组做不重复添加
 * @param arr
 * @param item
 */
export function noDupPush(arr: (string | number)[], item: string | number) {
  if (!arr.includes(item)) arr.push(item);
}

export function getVal(obj: Record<string, any>, key: string) {
  return obj[key];
}


export function getDepth(obj: Record<string, any>) {
  let depth = 0;
  if (obj.children) {
    obj.children.forEach((d: any) => {
      const tmpDepth = getDepth(d);
      if (tmpDepth > depth) {
        depth = tmpDepth;
      }
    });
  }
  return 1 + depth;
}

export function getObjDepth(obj: Record<string, any>) {
  type DepthRecorder = { num: number };

  const tryDectectObjDepth = (obj: Record<string, any>, curDepth: number, depthRecorder: DepthRecorder) => {
    const keys = okeys(obj);
    const newDepth = curDepth + 1;
    for (let i = 0; i < keys.length; i++) {
      const val = obj[keys[i]];
      if (isObject(val)) {
        if (depthRecorder.num < newDepth) depthRecorder.num = newDepth;
        tryDectectObjDepth(val, newDepth, depthRecorder);
      }
    }
  };

  const depthRecorder: DepthRecorder = { num: 1 };
  tryDectectObjDepth(obj, 1, depthRecorder);
  return depthRecorder.num;
}

export function isDepthLargeThan(obj: Record<string, any>, toCompre: number) {
  const depth = getObjDepth(obj);
  return depth > toCompre;
}
