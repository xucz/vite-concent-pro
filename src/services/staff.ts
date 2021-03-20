/**
 * 员工名字服务
 */

import debounce from 'lodash/debounce';

function getStaffList(): Array<[string, string]> {
  // @ts-ignore
  return window['_staffList'] || [];
}

let isInitCalled = false;

/**
 * 需要用员工数据的组件，需要在didMount时先调用此方法
 * 该方法会自己会保证只真正的调用一次
 */
export function initData() {
  if (isInitCalled) return;
  // isInitCalled = true;
  // const userScript = document.createElement('script');
  // userScript.src = `http://www.youstafname.com?v=${new Date().toDateString().replace(/ /g, '')}`;
  // userScript.async = true;
  // document.head.appendChild(userScript);

  // @ts-ignore 
  window['_staffList'] = [
    ['jack', 'jack(Beijing)'],
    ['mark', 'mark(Beijing)'],
    ['zzk', 'zzk(NewYork)'],
    ['hi concent', 'concent(Landon)'],
    ['hi concent2', 'concent(Beijing)'],
    ['hi concent3', 'concent(ShangHai)'],
  ];
}

/**
 * 查询用户
 * 为0时默认取10个
 * 长度大于2的字符串才开始真正匹配
 * @param {string} toMatchStr
 */
export function searchUsers(toMatchStr: string): Array<[string, string]> {
  if (toMatchStr.length === 0) return getStaffList().slice(0, 10);
  if (toMatchStr.length < 2) return [];
  const pattern = new RegExp(`^${toMatchStr}`);
  return getStaffList().filter((item) => {
    const [rtxname] = item;
    return pattern.test(rtxname);
  }).slice(0, 10);
}

/**
 * @type {(toMatchStr:string)=>string[]}
 * 防抖动的用户查询操作
 */
export const delaySearchUsers = debounce(searchUsers, 300);
