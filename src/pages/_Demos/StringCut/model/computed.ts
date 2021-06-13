import { St } from './meta';

export function reversedDesc(newState: St) {
  return newState.desc.split('').reverse().join('');
}
