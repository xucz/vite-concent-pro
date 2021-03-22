import React from 'react';
import { Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { KeyboardEv, MouseEv, InputChangeEv } from 'types/dom';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { IDiCompPropsBase } from './types';
import styles from './styles.module.css';
import { defaultSettings as d } from './common';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';

// const MuJSONInput = styled(JSONInput)`

// `;

const stPre = { color: 'red', display: 'inline-block', verticalAlign: 'top' };
const stIBtn = { position: 'absolute', right: '-38px', top: '0px', zIndex: 999 } as const;
const stIBtnLabel = { position: 'absolute', right: '-138px', top: '0px', zIndex: 999 } as const;

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
  placeholder?: any,
}

const noop = () => { };

export default function DiInput(props: IProps) {
  const {
    title, value, onChange, block,  required = true, extraStyle = {},
    interactiveCb, interactiveLabel = '', interactiveBtnLoading = false, placeholder = {},
    error,
  } = props;
  const style = { display: 'inline-block' };
  if (block) style.display = 'block';

  const uiRequred = <pre style={stPre}>{required ? '* ' : '  '}</pre>;

  const {
    item: itemSt = {},
    title: titleSt = {},
    input: inputSt = {},
  } = extraStyle;
  const mergedInputSt = { ...d.inputJsonStyle, ...inputSt }
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
      <div style={mergedInputSt}>
        <JSONInput
          placeholder={placeholder}
          onChange={(info: any) => onChange && onChange(info.json)}
          id='a_unique_id'
          locale={locale}
          height='520px'
          width='100%'
        />
      </div>
      {uiInteractiveBtn}
      {uiError}
    </div>
  );
}
