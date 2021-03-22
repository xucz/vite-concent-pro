/* eslint-disable react/prop-types */
import React from 'react';
import { Select } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import styled from 'styled-components';
import styles from './styles.module.css';
import { IDiCompPropsBase } from './types';
import { defaultSettings as d } from './common';

const { Option } = Select;
const stPre = { color: 'red', display: 'inline-block', verticalAlign: 'top' };
const MySelect = styled(Select)`
  .ant-select-selection-placeholder{
    color: #08132E;
  }
` as typeof Select;

interface IProps extends IDiCompPropsBase {
  value: any[] | any,
  inputSize?: SizeType,
  title?: string,
  onChange?: (value: string | string[]) => void,
  onSearch?: (value: string) => void,
  interactiveLabel?: string,
  interactiveBtnLoading?: boolean,
  tooltip?: string,
  error?: string,
  data: { value: any, label: string }[],
  /** 是否包含空选项 */
  hasEmpty?: boolean,
  /** 配合hasEmpty为true时使用，是否匹配上空值时才显示空选项 */
  smartEmpty?: boolean,
  emptyLabel?: string,
  emptyValue?: any,
  mode?: 'multiple' | 'tags',
}

export default function DiSelect(props: IProps) {
  const {
    required = true, block, title, value, onChange, onSearch, data = [],
    hasEmpty, emptyLabel = '不限', emptyValue = '', smartEmpty = false,
    extraStyle = {}, placeholder = '', mode, error = '',
  } = props;
  const style = { display: 'inline-block' };
  if (block) style.display = 'block';
  const uiRequred = <pre style={stPre}>{required ? '* ' : '  '}</pre>;

  const {
    title: titleSt = {},
    item: itemSt = {},
    input: inputSt = d.inputStyle,
    inputSize = d.inputSize,
  } = extraStyle;
  const mergedItemSt = { ...style, ...itemSt }

  let uiEmtpy = '' as React.ReactNode;
  if (hasEmpty) {
    const tmpEmptyUI = <Option key="__hasEmpty__" value={emptyValue}>{emptyLabel}</Option>;
    if (smartEmpty) {
      // 仅当传入value等于emptyValue时，显示空选项，否则就不显示
      if (value === emptyValue) uiEmtpy = tmpEmptyUI;
    } else {
      uiEmtpy = tmpEmptyUI;
    }
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
        {uiRequred}{title}
      </span>
      <MySelect mode={mode} value={value} size={inputSize} style={inputSt} onChange={onChange}
        placeholder={placeholder} onSearch={onSearch} showArrow
      >
        {uiEmtpy}
        {data.map((v: any, i: number) => <Option key={i} value={v.value}>{v.label}</Option>)}
      </MySelect>
      {uiError}
    </div>
  );
}
