import React from 'react';
import styles from "./general.module.css";

interface IBtn {
  className?: string;
}
function ButtonBase(props: IBtn & React.Props<HTMLButtonElement>) {
  return (
    <button {...props}>
      {props.children}
    </button>
  );
}

export function Button(props: any) {
  return <ButtonBase className={styles.button} {...props} />
}

export function AsyncButton(props: React.Props<any>) {
  return <ButtonBase className={styles.asyncButton} {...props} />
}


interface IBlankProps {
  children?: React.ReactNode;
  type?: 'horizon' | 'vertical';
  height?: string;
  width?: string;
  style?: React.CSSProperties;
}

export function Blank({ children = '', type = 'horizon', height = '16px', width = '28px', style = {} }: IBlankProps) {
  const mergedStyle = { display: 'inline-block', width, height, ...style };
  if (type === 'vertical') mergedStyle.display = 'block';

  return (
    <div style={mergedStyle}>{children}</div>
  );
}

export function NormalBlank(props: { width?: string }): React.ReactElement {
  return <Blank {...{ width: '8px', ...props }} />;
}

export function VerticalBlank(props: { height?: string }): React.ReactElement {
  return <Blank {...{ type: 'vertical', ...props }} />;
}


export function EmptyView() {
  return <span style={{ display: 'none' }}></span>
}
