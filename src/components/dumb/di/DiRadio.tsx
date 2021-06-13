/* eslint-disable react/prop-types */
import React from 'react';
import { Radio } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { RadioChangeEvent } from 'antd/lib/radio/interface';
import styles from './styles.module.css';
import { IDiCompPropsBase } from './types';
import { defaultSettings as d } from './common';


const stPre = { color: 'red', display: 'inline-block', verticalAlign: 'top' };

interface IProps extends IDiCompPropsBase {
  value: any[] | any,
  inputSize?: SizeType,
  title?: string,
  onChange?: (value: RadioChangeEvent) => void,
  onSearch?: (value: string) => void,
  interactiveLabel?: string,
  interactiveBtnLoading?: boolean,
  tooltip?: string,
  error?: string,
  data: { value: any, label: string }[],
}

export default function DiSelect(props: IProps) {
  const {
    required = true, block, title, value, onChange, data = [],
    extraStyle = {}, error = '',
  } = props;
  const style = { display: 'inline-block' };
  if (block) style.display = 'block';
  const uiRequired = <pre style={stPre}>{required ? '* ' : '  '}</pre>;

  const {
    title: titleSt = {},
    item: itemSt = {},
    input: inputSt = d.inputStyle,
  } = extraStyle;
  const mergedItemSt = { ...style, ...itemSt }


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
      <span className={styles.diItemSwitchWrap}>
        <Radio.Group onChange={onChange} value={value}>
          {data.map((item, i) => <Radio key={i} value={item.value}>{item.label}</Radio>)}
        </Radio.Group>
      </span>
      {uiError}
    </div>
  );
}
