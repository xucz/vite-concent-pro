/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
  }
}

declare module 'react-cookies' {
  export default {
    save: (key: string, value: string) => any,
  }
}
declare module 'react-json-editor-ajrm' {
  export default (...args: any[]) => any
}
declare module 'react-json-editor-ajrm/locale/en' {
}

declare module 'cute-http' {
  const anyFn = (...args: any[]) => any;
  const defaultExport = {
  } as { const: Record<string, any>, [methodName: string]: (...args: any[]) => any };

  export default defaultExport;
}

declare module '*.avif' {
  const src: string;
  export default src;
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
    const src: string;
    export default src;
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<
    SVGSVGElement
  > & { title?: string }>;

  const src: string;
  export default src;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module 'rc-picker' {
  interface SelectInfo {
    key: React.Key;
    keyPath: React.Key[];
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement>;
    selectedKeys?: React.Key[];
  }
}


/** @see https://github.com/Qix-/color */
declare module 'color' {
  export default class {
    constructor(hex: string): this;
    alpha(val: number): this;
    lighten(val: number): this;
    hex(): string;
  };
}


