import { VoidPayload } from 'types/store';
import { callTarget } from 'services/concent';
import * as msgService from 'services/message';
import * as appService from 'services/domain/app';
import * as staffService from 'services/staff';
import * as objUtil from 'utils/obj';
import * as arrUtil from 'utils/arr';
import * as timerUitl from 'utils/timer';
import { FIELD_TYPE_LIST } from 'configs/constant/biz';
import { IAC, St, CallerParams, ReducerFn } from './meta';
import getInitialState from './state';
import * as modelService from './service';

/** 如果视图里调整了提交数据步骤，这里需要调整映射关系 */
const step2fn = {
  1: perpareStep1,
  2: perpareStep2,
  3: perpareStep3,
};

function validateStepValues(moduleState: St, checker: (st: St) => any) {
  const errors = checker(moduleState);
  if (!objUtil.isNull(errors, { checkObjValues: true })) {
    let tip = '';
    objUtil.okeys(errors).forEach(key => errors[key] ? (tip += `${key}:${errors[key]} `) : '');
    msgService.error(tip);
    return { canChangeStep: false, errors };
  }
  return { canChangeStep: true, errors };
}

export function forCopy(payload: VoidPayload, moduleState: St, ac: IAC) {
  console.log('call ac.setState or ac.dispatch when needed', ac.setState);
}

export function searchMonitor(toMatch: string) {
  const matchedUserList = staffService.searchUsers(toMatch);
  return { matchedUserList };
}

/**
 * @param isNext - 是否到下一步，true下一步，false上一步
 */
export async function changeStep(isNext: boolean, moduleState: St, ac: IAC) {
  const { step, isBtnClicked } = moduleState;
  const newStep = (isNext ? step + 1 : step - 1) as any;

  if (isNext) {
    if (!isBtnClicked) await ac.setState({ isBtnClicked: true });
    const { canChangeStep } = await ac.dispatch(step2fn[step]);
    if (canChangeStep) {
      return { step: newStep };
    }
  } else {
    // 点击了回退
    const toSet = { isBtnClicked, step: newStep }
    if (isBtnClicked) toSet.isBtnClicked = false;
    return toSet;
  }
}

export function nextStep(p: VoidPayload, moduleState: St, ac: IAC) {
  ac.dispatch(changeStep, true);
}

export async function pervStep(p: VoidPayload, moduleState: St, ac: IAC) {
  ac.dispatch(changeStep, false);
}

export async function fetchAppIdInfo(p: VoidPayload, moduleState: St, ac: IAC) {
  const { appId } = moduleState;
  const err = modelService.checkers.appId(appId);
  if (err) {
    return msgService.error(err);
  }

  await ac.setState({ checkAppIdBtnLoading: true });
  try {
    const ret = await appService.fetchAppDetail(appId);
    const { appDetail } = ret;
    return { appDetail, checkAppIdBtnLoading: false };
  } catch (err) {
    msgService.error(err.message);
    return { checkAppIdBtnLoading: false };
  }
}

export async function perpareStep1(p: VoidPayload, moduleState: St, ac: IAC) {
  await ac.setState({ nextBtnLoading: true });
  await ac.dispatch(fetchAppIdInfo); // 始终要刷新下appId对应的信息，防止用户中途修改了appId
  await ac.setState({ nextBtnLoading: false });

  const { canChangeStep, errors } = validateStepValues(moduleState, modelService.checkStep1);
  if (canChangeStep) {
    // 把第一步的 displayName 赋值给 tableDb，同时也允许用户修改
    return { canChangeStep: true, tableDb: moduleState.displayName, isBtnClicked: false, errors };
  }
  return { canChangeStep: true, errors }; // 这里应该是 canChangeStep: false，为了能够让演示走到下一步故意放过
  // return { canChangeStep: false, errors };
}

export async function perpareStep2(p: VoidPayload, moduleState: St, ac: IAC) {
  // 做点延时让 json 区域的输入有机会同步到 moduleState
  await ac.setState({ nextBtnLoading: true });
  await timerUitl.delay(500);

  const { canChangeStep, errors } = validateStepValues(moduleState, modelService.checkStep2);
  if (canChangeStep) {
    const { dataExample, dataExampleJson } = moduleState;
    // 可能用户没有输入示例数据，直接使用了 DiInputJson 的占位数据
    const targetJsonStr = dataExample || JSON.stringify(dataExampleJson);
    let targetExampleJson = objUtil.safeParse(targetJsonStr);
    return {
      canChangeStep: true, isBtnClicked: false, errors, dataExample: targetJsonStr,
      dataExampleJson: targetExampleJson, nextBtnLoading: false,
    };
  }

  return { canChangeStep: true, errors, nextBtnLoading: false }; // 这里应该是 canChangeStep: false，为了能够让演示走到下一步故意放过
  // return { canChangeStep: false, errors, nextBtnLoading: false };
}

export async function perpareStep3(p: VoidPayload, moduleState: St) {
  return { canChangeStep: true };
}

export function addField(p: VoidPayload, moduleState: St, ac: IAC) {
  const { fields, fieldOptionsList } = moduleState;
  const { fields: exampleFields } = ac.moduleComputed.exampleData;
  const selectedNames = fields.map(f => f.fieldName);
  const newFields = arrUtil.removeDupStrItem(exampleFields, selectedNames);
  if (newFields.length === 0) {
    return void (msgService.warn('无新的字段可添加了'));
  }

  const oneField = newFields[0];
  fields.push({
    fieldName: oneField,
    fieldType: FIELD_TYPE_LIST[0],
    isMulti: false,
    count: 0,
  });
  fieldOptionsList.push(newFields.map(f => ({ value: f, label: f })));
  return { fields, fieldOptionsList };
}

export function addGroup(index: number, moduleState: St, ac: IAC) {
  const { groupFields } = moduleState;
  // 在当前项的下一个位置做添加操作
  groupFields.splice(index + 1, 0, {
    groupFieldName: '',
    fields: [],
  });
  return { groupFields };
}


export function removeGroup(index: number, moduleState: St, ac: IAC) {
  const { groupFields } = moduleState;
  groupFields.splice(index, 1);
  return { groupFields };
}

export function removeField(index: number, moduleState: St, ac: IAC) {
  const { fields } = moduleState;
  fields.splice(index, 1);
  return { fields };
}

// 在 meta.js 里已注册为ghost函数
// 支持 reducer文件里内部调用 ac.dispatch(loading, [targetFn, payload])
// 或者视图里触发 mrg.loading.targetFn(payload)
export async function loading(callerParams: CallerParams | [ReducerFn, any], moduleState: St, ac: IAC) {
  await ac.setState({ loading: true });
  await callTarget(callerParams, ac);
  return { loading: false };
}

// 由lifecycle触发
export function initState(callerParams: CallerParams | [ReducerFn, any], moduleState: St, ac: IAC) {
  // 自动同步当前登录者，运行用户二次修改
  const userName = ac.rootState.$$global.userName;
  const matchedUserList = staffService.searchUsers(userName.substr(0, 2));
  return { creator: userName, matchedUserList };
}

export function clear() {
  return getInitialState();
}
