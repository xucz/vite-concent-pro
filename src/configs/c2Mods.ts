
/**
 * delare module names in this file
 */

export const DEMO = 'DemoModel' as const;
export type T_DEMO = typeof DEMO;

export const DEMO_TODO_LIST = 'DemoTodoList' as const;
export type T_DEMO_TODO_LIST = typeof DEMO_TODO_LIST;

export const DEMO_CLONED = 'DemoCloned' as const;
export type T_DEMO_CLONED = typeof DEMO_CLONED;

export const COUNTER = 'Counter' as const;
export type T_COUNTER = typeof COUNTER;

export const HOME = 'Home' as const;
export type T_HOME = typeof HOME;

// 接入申请页面
export const APPLY_CONFIG = 'ApplyConfig' as const;
export type T_APPLY_CONFIG = typeof APPLY_CONFIG;

// 接入列表页面
export const APPLY_LIST = 'ApplyList' as const;
export type T_APPLY_LIST = typeof APPLY_LIST;
