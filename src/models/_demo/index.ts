import { DEMO } from 'configs/c2Mods';
import state from './state';
import * as reducer from './reducer';
import * as computed from './computed';
import * as lifecycle from './lifecycle';

export default {
  [DEMO]: {
    state,
    reducer,
    computed,
    lifecycle,
  },
};
