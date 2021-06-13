/* eslint-disable react/prop-types */
import React from 'react';
import { IDiCompPropsBase } from './types';
import { defaultSettings as d } from './common';
import styles from './styles.module.css';

function DiLabel(props: React.PropsWithChildren<{}>) {
  return (
    <div className={styles.diItemWrap} style={{ display: 'inline-block', height: '32px', lineHeight: '32px' }}>
      {props.children}
    </div>
  );
}

const stPre = { color: 'red', display: 'inline-block', verticalAlign: 'top' };
interface IBoxedProps extends IDiCompPropsBase {
  value: string | number | boolean,
  genBoolText?: boolean,
  title?: string,
  tooltip?: string,
  error?: string,
  required?: boolean,
}

DiLabel.Boxed = function Boxed(props: IBoxedProps) {
  const {
    title, value, block, required = true, extraStyle = {}, genBoolText = true,
  } = props;
  const style = { display: 'inline-block' };
  if (block) style.display = 'block';
  let label = value;
  if (typeof value === 'boolean' && genBoolText) {
    label = value ? '是' : '否';
  }

  const uiRequired = <pre style={stPre}>{required ? '* ' : '  '}</pre>;

  const {
    item: itemSt = {},
    title: titleSt = {},
    input: inputSt = d.boxedLabelStyle,
  } = extraStyle;
  const mergedItemSt = { ...style, ...itemSt };


  return (
    <div className={styles.diItemWrap} style={mergedItemSt}>
      <span className={styles.diItemTitle} style={titleSt}>
        {uiRequired}{title}
      </span>
      <span style={inputSt}>{label}</span>
    </div>
  );
};

export default DiLabel;
