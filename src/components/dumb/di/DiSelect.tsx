/* eslint-disable react/prop-types */
import React from 'react';
import { Select } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import styles from './styles.module.css';
import { IDiCompPropsBase } from './types';
import { defaultSettings as d } from './common';

const { Option } = Select;
const stPre = { color: 'red', display: 'inline-block', verticalAlign: 'top' };

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
  showSearch?: boolean,
}

function DiSelect(props: IProps) {
  const {
    required = true, block, title, value, onChange, onSearch, data = [],
    hasEmpty, emptyLabel = '不限', emptyValue = '', smartEmpty = false,
    extraStyle = {}, placeholder = '', mode, error = '', disabled = false,
    showSearch = false,
  } = props;
  const _showSearch = onSearch ? true : showSearch;
  const style = { display: 'inline-block' };
  if (block) style.display = 'block';
  const uiRequired = <pre style={stPre}>{required ? '* ' : '  '}</pre>;

  const {
    title: titleSt = {},
    item: itemSt = {},
    input: inputSt = d.inputStyle,
    inputSize = d.inputSize,
  } = extraStyle;
  const mergedItemSt = { ...style, ...itemSt }

  let uiEmpty = '' as React.ReactNode;
  if (hasEmpty) {
    const tmpEmptyUI = <Option key="__hasEmpty__" value={emptyValue}>{emptyLabel}</Option>;
    if (smartEmpty) {
      // 仅当传入value等于emptyValue时，显示空选项，否则就不显示
      if (value === emptyValue) uiEmpty = tmpEmptyUI;
    } else {
      uiEmpty = tmpEmptyUI;
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
        {uiRequired}{title}
      </span>
      <Select mode={mode} value={value} size={inputSize} style={inputSt} onChange={onChange}
        placeholder={placeholder} onSearch={onSearch} showArrow disabled={disabled} showSearch={_showSearch}
      >
        {uiEmpty}
        {data.map((v: any, i: number) => <Option key={i} value={v.value}>{v.label}</Option>)}
      </Select>
      {uiError}
    </div>
  );
}

export const DiSelectMemo = DiSelect.Memo = React.memo(function (props: IProps) {
  return <DiSelect {...props} />
});

export default DiSelect;
