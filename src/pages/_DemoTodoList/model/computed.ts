import { St } from './meta';

// only value change will triiger this function to execute again
export function doubleCount({ value }: St) {
  return value * 2;
}

export function formattedInput({ keyword }: St) {
  return `用户正在输入 ${keyword}`;
}

