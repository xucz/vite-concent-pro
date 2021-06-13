import React from 'react';
import { Switch } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { IDiCompPropsBase } from './types';
import styles from './styles.module.css';
import { defaultSettings as d } from './common';

const stPre = { color: 'red', display: 'inline-block', verticalAlign: 'top' };

interface IProps extends IDiCompPropsBase {
  value: boolean,
  inputSize?: SizeType,
  title?: string,
  onChange: (checked: boolean) => void,
  error?: string,
}

export default function DiInput(props: IProps) {
  const {
    title, value, onChange, block, disabled, required = true, extraStyle = {},
    error,
  } = props;
  const style = { display: 'inline-block' };
  if (block) style.display = 'block';

  const uiRequired = <pre style={stPre}>{required ? '* ' : '  '}</pre>;

  const {
    item: itemSt = {},
    title: titleSt = {},
    input: inputSt = d.inputStyle,
    inputSize = d.inputSize,
  } = extraStyle;
  const mergedItemSt = { ...style, ...itemSt }

  let uiInteractiveBtn = '' as React.ReactNode;

  let uiError = '' as React.ReactNode;
  if (error) {
    uiError = (
      <div className={styles.diItemError}>
        <span className={styles.diItemTitle} style={titleSt}></span>
        <div style={{ display: 'inline-block', wordWrap: 'break-word', ...inputSt }}>{error}</div>
      </div>
    )
  }

  return (
    <div className={styles.diItemWrap} style={mergedItemSt}>
      <span className={styles.diItemTitle} style={titleSt}>
        {uiRequired}{title}
      </span>
      <Switch disabled={disabled} checked={value} onChange={onChange}
        size={inputSize} style={inputSt} />
      {uiInteractiveBtn}
      {uiError}
    </div>
  );
}
