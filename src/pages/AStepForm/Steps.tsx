import React from 'react';
import { useModel } from './model/meta';
import styles from './StepForm.module.css';
import Step from './dumb/Step';


export default React.memo(function Header() {
  const {moduleComputed: {step2Status}} = useModel();
  return (
    <div className={styles.headerWrap}>
      <Step line={false} label="基础信息" status={step2Status['1']}/>
      <Step num="2" label="数据库信息" status={step2Status['2']}/>
      <Step num="3" label="字段信息" status={step2Status['3']}/>
      <Step num="4" label="其他配置" status={step2Status['4']}/>
    </div>
  );
})
