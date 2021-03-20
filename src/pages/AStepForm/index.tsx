import './model';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Steps from './Steps';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import NextOrPrev from './NextOrPrev';

function Home(props: RouteComponentProps) {
  return (
    <div style={{paddingTop: '180px'}}>
      <Steps/>
      <Step1 step={1}/>
      <Step2 step={2}/>
      <Step3 step={3}/>
      <NextOrPrev/>
    </div>
  );
}

export default React.memo(Home);
