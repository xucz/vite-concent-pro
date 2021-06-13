import React from 'react';
import { Input, Button, Tooltip } from 'antd';
import { ReloadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { KeyboardEv, MouseEv, InputChangeEv } from 'types/dom';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { IDiCompPropsBase } from './types';
import styles from './styles.module.css';
import { defaultSettings as d } from './common';

const stPre = { color: 'red', display: 'inline-block', verticalAlign: 'top' };
const stIBtn = { position: 'absolute', right: '-38px', top: '0px', zIndex: 999 } as const;
const stIBtnLabel = { position: 'absolute', right: '-108px', top: '0px', zIndex: 999 } as const;

interface IProps extends IDiCompPropsBase {
  value: string,
  inputSize?: SizeType,
  title?: string,
  onChange: (e: InputChangeEv) => void,
  onEnter?: (e: KeyboardEv) => void,
  interactiveCb?: (e: MouseEv) => void,
  interactiveLabel?: string,
  interactiveBtnLoading?: boolean,
  tooltip?: string,
  error?: string,
}

const noop = () => { };

export default function DiInput(props: IProps) {
  const {
    title, value, onChange, onEnter, block, disabled, required = true, extraStyle = {},
    interactiveCb, interactiveLabel = '', interactiveBtnLoading = false, placeholder = '',
    tooltip = '', error,
  } = props;
  const style = { display: 'inline-block' };
  if (block) style.display = 'block';

  const onKeyDown = onEnter ? (e: KeyboardEv) => {
    if (e.keyCode === 13) onEnter(e);
  } : noop;
  const uiRequired = <pre style={stPre}>{required ? '* ' : '  '}</pre>;

  const {
    item: itemSt = {},
    title: titleSt = {},
    input: inputSt = d.inputStyle,
    inputSize = d.inputSize,
  } = extraStyle;
  const mergedItemSt = { ...style, ...itemSt }

  let uiInteractiveBtn = '' as React.ReactNode;
  if (interactiveCb) {
    if (interactiveLabel) {
      uiInteractiveBtn = (
        <Button onClick={interactiveCb} type="default"
          loading={interactiveBtnLoading} style={stIBtnLabel} >
          {interactiveLabel}
        </Button>
      );
    } else {
      uiInteractiveBtn = (
        <Button type="primary" icon={<ReloadOutlined />} onClick={interactiveCb}
          loading={interactiveBtnLoading} shape="circle" style={stIBtn} />
      );
    }
  }

  let uiTooltip = '' as React.ReactNode;
  if (tooltip) {
    uiTooltip = (
      <Tooltip title={tooltip}>
        <ExclamationCircleOutlined />
      </Tooltip>
    );
  }

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
      <Input disabled={disabled} value={value} onChange={onChange} onKeyDown={onKeyDown}
        size={inputSize} style={inputSt} placeholder={placeholder} suffix={uiTooltip} />
      {uiInteractiveBtn}
      {uiError}
    </div>
  );
}
