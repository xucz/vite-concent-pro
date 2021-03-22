import React from 'react';
import { Card, Button, Row, Col } from 'antd';
import { DiInput, DiSelect } from 'components/dumb/di';
import { EmptyView, VerticalBlank } from 'components/dumb/general';
import { CtxPre, useModelWithSetup } from './model/meta';

function Title() {
  const openPasssTab = () => window.open('https://www.baidu.com/s?wd=appid');
  return (
    <div >
      step1:基础信息
      <Button onClick={openPasssTab} style={{ float: 'right' }} type="primary">
        获取目标appID
      </Button>
    </div>
  );
}

function setup(ctx: CtxPre) {
  return {
    appIdTip: '请输入在 xxx平台 注册过的appID',
    intro: '请描述功能',
    displayNamePlaceHolder: '如"我们"',
    displayNameTip: '按照“xx_yy_zz格式',
    viewNamePlaceHolder: '如"cool_project"',
    viewNameTip: '不以数字结尾',
  }
}

interface IProps {
  step: number,
}

function BasicInfo(props: IProps) {
  const { sync, state, settings: se, mr, moduleComputed: mcu } = useModelWithSetup(setup);
  const { errors } = state;
  if (state.step !== props.step) return <EmptyView />;

  return (
    <Card title={<Title />}>
      <Row>
        <Col span={8}>
          <DiInput title="appid:" value={state.appId} onChange={sync('appId')} tooltip={se.appIdTip}
            interactiveCb={mr.fetchAppIdInfo} interactiveBtnLoading={state.checkAppIdBtnLoading} error={errors.appId}
          />
        </Col>
        <Col span={8}>
          <DiInput disabled title="appDetail:" value={state.appDetail} onChange={sync('appDetail')} error={errors.appDetail} />
        </Col>
      </Row>
      <VerticalBlank />
      <Row>
        <Col span={8}>
          <DiInput title="displayName:" value={state.displayName} onChange={sync('displayName')} error={errors.displayName}
            placeholder={se.displayNamePlaceHolder} tooltip={se.displayNameTip}
          />
        </Col>
        <Col span={8}>
          <DiInput title="申请人:" value={state.creator} onChange={sync('creator')} error={errors.creator} />
        </Col>
      </Row>
      <VerticalBlank />
      <Row>
        <Col span={12}>
          <DiSelect title="负责人:" data={mcu.staffDataList} value={state.monitor} onChange={sync('monitor')}
            error={errors.monitor} onSearch={mr.searchMonitor} placeholder="选择多个负责人" mode="multiple"
          />
        </Col>
      </Row>
      <VerticalBlank />
      <Row>
        <Col span={12}>
          <DiInput title="简介:" value={state.comment} onChange={sync('comment')} placeholder={se.intro} error={errors.comment} />
        </Col>
      </Row>
    </Card>
  );
}

export default React.memo(BasicInfo);
