import React from 'react';
import { Avatar } from 'antd';
import styled from 'styled-components';
import styles from './Step.module.css';

const MyAvatar = styled(Avatar)`
  .ant-avatar{
    width: 64px;
    height: 64px;
    border: 1px solid red;
  }
`;

const status2StepStyle: any = {
  finished: {
    avatarCls: styles.stepDone,
    lineCls: styles.stepLineActive,
    labelColor: '#999999',
  },
  editing: {
    avatarCls: styles.stepEditing,
    lineCls: styles.stepLineActive,
    labelColor: 'black',
  },
  onceEditing: {
    avatarCls: styles.stepOnceEditing,
    lineCls: styles.stepLineActive,
    labelColor: '#black',
  },
  unstart: {
    avatarCls: styles.stepUnstart,
    lineCls: styles.stepLine,
    labelColor: '#999999',
  }
};
const labelLen2offset = { 3: '-1px', 4: '5px', 5: '17px' } as any;

interface IStepProps {
  num?: string;
  label: string;
  labelOffset?: string;
  /** 左侧是否需要绘制线条，默认true */
  line?: boolean;
  status: string;
  onClick?: () => void;
}
export default function Step({ num = '1', label, labelOffset = '', line = true, status, onClick }: IStepProps) {
  let { avatarCls, lineCls, labelColor } = status2StepStyle[status];
  if (!line) lineCls = styles.stepNoLine;
  let numLabel = num;
  if (status === 'finished') numLabel = '✓';
  const labelStyle = { color: labelColor, transform: '' };
  if (labelOffset) labelStyle.transform = `translateX(${labelOffset})`;
  else if (label) {
    const offset = labelLen2offset[label.length];
    labelStyle.transform = `translateX(${offset})`;
  }

  return (
    <div className={`${styles.stepWrap} gHover`} onClick={onClick}>
      <div className={lineCls}></div>
      <MyAvatar className={avatarCls}>{numLabel}</MyAvatar>
      <div className={styles.stepLabel} style={labelStyle}>{label}</div>
    </div>
  );
}