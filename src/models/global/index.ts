import { cst } from 'concent';
import state from './state';
import * as reducer from './reducer';
import * as computed from './computed';
import * as lifecycle from './lifecycle';

export default {
  [cst.MODULE_GLOBAL]: {
    state, reducer, computed, lifecycle,
  },
};
