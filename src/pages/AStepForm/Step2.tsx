import React from 'react';
import { Card, Row, Col } from 'antd';
import { DiInput, DiSelect, DiInputNum, DiInputJsonMonaco } from 'components/dumb/di';
import { EmptyView, VerticalBlank } from 'components/dumb/general';
import { CtxPre, useModelWithSetup } from './model/meta';

const seEx = { title: { width: '150px' }, input: { width: 'calc(100% - 150px)' } };

function setup(ctx: CtxPre) {
  return {
    dbTypeOptions: [
      { value: 'kafka', label: 'kafka' },
      { value: 'mysql', label: 'mysql' },
    ],
    formatter: (value: string) => `${value} 万`,
    openJsonEditor: () => {
      window.open('http://jsoneditoronline.org/');
    }
  }
}

interface IProps {
  step: number,
}

function DataSync(props: IProps) {
  const { state, syncer, settings: se } = useModelWithSetup(setup);
  const { errors } = state;
  if (state.step !== props.step) return <EmptyView />;
  return (
    <Card title="数据源">
      <Row>
        <Col span={8}>
          <DiSelect title="数据库类型:" value={state.dbType} onChange={syncer.dbType} error={errors.dbType}
            data={se.dbTypeOptions} extraStyle={seEx}
          />
        </Col>
        <Col span={8}>
          <DiInput title="数据库别名:" value={state.dbAlias} onChange={syncer.dbAlias} error={errors.dbAlias}
            extraStyle={seEx}
          />
        </Col>
      </Row>
      <VerticalBlank />
      <Row>
        <Col span={8}>
          <DiInputNum title="预估总数1:" value={state.count1} onChange={syncer.count1}
            error={errors.count1} extraStyle={seEx} formatter={se.formatter}
          />
        </Col>
        <Col span={8}>
          <DiInputNum title="预估总数2:" value={state.count2} onChange={syncer.count2}
            error={errors.count2} extraStyle={seEx} formatter={se.formatter}
          />
        </Col>
        <Col span={8}>
          <DiInputNum title="预估总数3:" value={state.count3} onChange={syncer.count3}
            error={errors.count3} extraStyle={seEx} formatter={se.formatter}
          />
        </Col>
      </Row>
      <VerticalBlank />
      <Row>
        <Col span={16}>
          <DiInputJsonMonaco title="示例数据:" value={state.dataExample} onChange={syncer.dataExample}
            extraStyle={seEx} error={errors.dataExample} interactiveCb={se.openJsonEditor}
            interactiveLabel="Open JsonEditor"
          />
        </Col>
      </Row>
    </Card>
  );
}

export default React.memo<IProps>(DataSync);
