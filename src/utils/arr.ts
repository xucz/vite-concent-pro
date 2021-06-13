

/**
 * 将list转为map
 * @param list
 * @param keyNameOrFn 选择哪个key的值作为map的key，也可以是一个动态生成key的函数
 * @param getValue
*/
export function toMap<T, V extends any = T>(list: T[], keyNameOrFn: keyof T | ((value: T) => string), getValue?: (value: T) => any): Record<string, V> {
  const map = {} as Record<string, V>;
  if (!list) return map;
  list.forEach(v => {
    const anyV = v as any;
    let mapKey;
    if (typeof keyNameOrFn === 'function') mapKey = keyNameOrFn(v);
    else mapKey = anyV[keyNameOrFn];

    if (getValue) map[mapKey] = getValue(v);
    else map[mapKey] = anyV;
  });
  return map;
}


export function removeDupStrItem(oriList: string[], toRemoveList: string[]) {
  const newList: string[] = [];
  oriList.forEach(item => !toRemoveList.includes(item) && newList.push(item));
  return newList;
}

export function removeTargetItem<T extends any>(oriList: T[], findCb: (item: T) => boolean) {
  const idx = oriList.findIndex(findCb);
  const copyList = oriList.slice();
  copyList.splice(idx, 1);
  return copyList;
}


export function lastItem<T>(arr: T[]): T {
  return arr[arr.length - 1];
}

export function nodupStrPush(oriList: string[], toPush: string) {
  if (!oriList.includes(toPush)) oriList.push(toPush);
};

type PrimitiveItem = number | string;
/**
 * merge([1,2,3], [4,5,6])
 * @param listArgs - 多个list参数
 */
export function merge<T extends PrimitiveItem>(...listArgs: T[][]) {
  let tmpList: T[] = [];
  listArgs.forEach(list => tmpList = tmpList.concat(list));
  const set = new Set(tmpList);
  tmpList = Array.from(set);
  // listArgs.forEach(list => list.forEach(item => nodupPush(tmpList, item)));
  return tmpList;
}

/**
 * 区别于 merge， 类型上支持 混合类型的数组一起 merge
 * merge([1,2,3], ['5','6'], [8,1,2])
 * @param listArgs - 多个list参数
 */
export function mergeMix(...listArgs: PrimitiveItem[][]) {
  return merge(...listArgs);
}
