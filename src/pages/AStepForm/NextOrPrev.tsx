import React from 'react';
import { Button, Row, Col } from 'antd';
import { EmptyView, VerticalBlank, Blank } from 'components/dumb/general';
import { useModel } from './model/meta';

function ButtonRow() {
  const { state, mr } = useModel();
  const { step, finishStep } = state;

  let uiPrevBtn = <EmptyView />;
  let uiNextBtn = <EmptyView />;
  if (step === 1 || step <= finishStep) {
    uiNextBtn = <Button type="primary" onClick={mr.nextStep} loading={state.nextBtnLoading}>下一步</Button>
  }
  if (step > 1) {
    uiPrevBtn = <Button type="primary" onClick={mr.pervStep}>上一步</Button>
  }

  return (
    <Row style={{ textAlign: 'center' }}>
      <VerticalBlank />
      <Col span={24}>{uiPrevBtn}<Blank />{uiNextBtn}</Col>
    </Row>
  );
}

export default React.memo(ButtonRow);