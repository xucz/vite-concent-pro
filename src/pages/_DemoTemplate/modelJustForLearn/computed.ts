import { St } from './meta';

// only value change will triiger this function to execute again
export function reversedDesc(newState: St) {
  // use input newState to calculate new value
  return newState.desc.split('').reverse().join('');
}
