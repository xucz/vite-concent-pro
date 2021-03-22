
import { St } from './meta';
import { defWatch } from 'concent';
import { checkers } from './service';
import * as ObjUtil from 'utils/obj';

export const watchAllKeyChange = defWatch((newState: St, o, fnCtx) => {
  const { errors, isBtnClicked } = newState;
  if (!isBtnClicked) {
    return;
  }

  // 注意此处是用了同一个 errors 对象在收集各个 key 的错误
  const checkForOneKey = (oneSetKey: string) => {
    const val = ObjUtil.getVal(newState, oneSetKey);
    const error = checkers[oneSetKey](val);
    if (error) {
      errors[oneSetKey] = error;
      fnCtx.commit({ errors });
    } else if (errors[oneSetKey]) {
      errors[oneSetKey] = '';
      fnCtx.commit({ errors });
    }
  }
  fnCtx.setted.forEach(settedKey => checkForOneKey(settedKey));

}, '*');


