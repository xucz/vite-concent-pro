import { St } from './state';

export function revesedDesc(n: St) {
  return n.desc.split('').reverse().join('');
}
