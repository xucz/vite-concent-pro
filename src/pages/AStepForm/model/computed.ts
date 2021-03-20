import { St } from './meta';
import { okeys, safeParse } from 'utils/obj';

export function staffDataList(newState: St) {
  const {matchedUserList} = newState;
  return matchedUserList.map(item => ({value: item[0], label: item[1]}));
}

/**
 * 根据当前处于第几步自动计算出其他步骤的状态
 * @param newState
 */
export function step2Status(newState: St) {
  const {step: curStep, step2isFinished, step2isOnceEditing, id} = newState;
  const defaultStatus = id ? 'finished' : 'unstart';
  const status = {
    1: defaultStatus,
    2: defaultStatus,
    3: defaultStatus,
    4: defaultStatus,
    5: defaultStatus,
  };
  const keys = okeys(status) as ['1']; // 这样写是为了下面status赋值成功
  keys.forEach((key) => {
    const step = parseInt(key, 10);
    if (step === curStep) status[key] = 'editing';
    else if (step < curStep) {
      status[key] = 'finished';
    } else {
      if (step2isFinished[step]) status[key] = 'finished';
      else if (step2isOnceEditing[step]) status[key] = 'onceEditing';
    }
  });
  return status;
}

export function exampleData(newState: St) {
  const {dataExample, dataExampleJson} = newState;
  const jsonObj = safeParse(dataExample, dataExampleJson);
  const keys = okeys(jsonObj);
  return {
    options: keys.map(key => ({value: key, label: key})),
    fields: keys,
  };
}
