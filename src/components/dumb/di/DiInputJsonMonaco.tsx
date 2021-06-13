/**
 * 基于 monaco-editor 的输入控件
 */
import React from 'react';
import { Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { MouseEv } from 'types/dom';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { IDiCompPropsBase } from './types';
import styles from './styles.module.css';
import { defaultSettings as d } from './common';
import MonacoEditor from 'react-monaco-editor';

const stPre = { color: 'red', display: 'inline-block', verticalAlign: 'top' };
const stIBtn = { position: 'absolute', right: '-38px', top: '0px', zIndex: 999 } as const;
const stIBtnLabel = { position: 'absolute', right: '-138px', top: '0px', zIndex: 999 } as const;

interface IProps extends IDiCompPropsBase {
  value: string,
  inputSize?: SizeType,
  title?: string,
  onChange?: (value: string) => void,
  editorDidMount?: (editor: any) => void,
  interactiveCb?: (e: MouseEv) => void,
  interactiveLabel?: string,
  interactiveBtnLoading?: boolean,
  tooltip?: string,
  error?: string,
  height?: string
}

const noop = (...args: any[]) => { };

export default function DiInput(props: IProps) {
  const {
    title, value, onChange = noop, editorDidMount, block, required = true, extraStyle = {},
    interactiveCb, interactiveLabel = '', interactiveBtnLoading = false,
    error, height,
  } = props;
  const style = { display: 'inline-block' };
  if (block) style.display = 'block';

  const uiRequired = <pre style={stPre}>{required ? '* ' : '  '}</pre>;

  const {
    item: itemSt = {},
    title: titleSt = {},
    input: inputSt = {},
  } = extraStyle;
  const mergedInputSt = { ...d.inputJsonStyle, ...inputSt };
  const mergedItemSt = { ...style, ...itemSt };

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
    );
  }

  return (
    <div className={styles.diItemWrap} style={mergedItemSt}>
      <span className={styles.diItemTitle} style={titleSt}>
        {uiRequired}{title}
      </span>
      <div style={mergedInputSt}>
        <MonacoEditor
          width="100%"
          height={height || '600px'}
          language="json"
          theme="vs-dark"
          value={value}
          options={{ selectOnLineNumbers: true }}
          onChange={onChange}
          editorDidMount={editorDidMount}
        />
      </div>
      {uiInteractiveBtn}
      {uiError}
    </div>
  );
}
