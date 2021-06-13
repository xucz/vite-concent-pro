import React from 'react';
import { Card, Button, Row, Col, Empty } from 'antd';
import styled from 'styled-components';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { EmptyView, VerticalBlank } from 'components/dumb/general';
import { DiInput, DiSelect, DiInputNum } from 'components/dumb/di';
import { fieldTypeOptions } from 'configs/derived/biz';
import { CtxPre, useModelWithSetup } from './model/meta';
import { FieldGroupItem } from './model/state';

const seEx = { title: { width: '150px' }, input: { width: 'calc(100% - 150px)' } };
const seGroupFieldsEx = { title: { width: '150px' }, input: { width: '50%' } };
const stAddFieldBtn = { width: '100%' };
const stMinusBtnWrap = { margin: '6px 32px', float: 'right', color: 'var(--theme-color)' } as React.CSSProperties;
const stMinusBtnWrap2 = { marginTop: '6px', float: 'right', color: 'var(--theme-color)' } as React.CSSProperties;
const stMinusBtnWrap3 = { margin: '6px 32px', float: 'right', color: 'var(--theme-color)' } as React.CSSProperties;
const stMinusBtn = { fontSize: '18px', marginRight: '5px', verticalAlign: 'middle' } as React.CSSProperties;
const stMinusBtnLabel = { verticalAlign: 'middle' } as React.CSSProperties;
const MyCard = styled(Card)`
  .ant-card-head-wrapper{
    height:46px;
    font-size: 14px;
  }
`;
const stExtra = { item: { width: '300px' }, title: { width: '70px' } };

function setup(ctx: CtxPre) {
  const { mr, sync } = ctx;
  return {
    stInnerCard: { backgroundColor: '#E8F1FF', height: '46px', fontWeight: 400 },
    tureOrFalseOptions: [
      { value: true, label: '是' },
      { value: false, label: '否' },
    ],
    uiGroupTitle(field: FieldGroupItem, index: number) {
      return (
        <div style={{ marginTop: '12px' }}>
          <DiInput title="分组名: " value={field.groupFieldName} onChange={sync(`groupFields.${index}.groupFieldName`)}
            extraStyle={stExtra} placeholder={`请输入分组${index + 1}的名称`}
          />
          <span className="gHover" style={stMinusBtnWrap3} onClick={() => mr.addGroup(index)}>
            <PlusCircleOutlined style={stMinusBtn} />
            <span style={stMinusBtnLabel}>添加分组</span>
          </span>
          {index !== 0
            && <span className="gHover" style={stMinusBtnWrap2} onClick={() => mr.removeGroup(index)}>
              <MinusCircleOutlined style={stMinusBtn} />
              <span style={stMinusBtnLabel}>删除分组</span>
            </span>
          }
        </div>
      );
    },
  }
}

interface IProps {
  step: number,
}

function Step3(props: IProps) {
  const { state, sync, settings: se, mr, moduleComputed: mcu } = useModelWithSetup(setup);
  if (state.step !== props.step) return <EmptyView />;
  const lastIdx = state.fields.length - 1;

  return (
    <Card title="Step3">
      <Row>
        <Col span={8}>
          <DiInput title="表名:" value={state.tableDb} onChange={sync('tableDb')} extraStyle={seEx}
            placeholder="请输入表名"
          />
        </Col>
      </Row>
      <VerticalBlank />
      <Button type="link">字段控制</Button>
      <VerticalBlank height="8px" />
      <MyCard title="字段类型输入" headStyle={se.stInnerCard}>
        {lastIdx === -1 && <Empty />}
        {state.fields.map((f, i) => (
          <div key={i} style={{ borderBottom: `1px solid ${lastIdx === i ? 'transparent' : 'lightgrey'}`, marginBottom: '13px' }}>
            <Row>
              <Col span={8}>
                <DiSelect title="数据字段:" value={f.fieldName} onChange={sync(`fields.${i}.fieldName`)} extraStyle={seEx}
                  data={state.fieldOptionsList[i]} />
              </Col>
              <Col span={8}>
                <DiSelect title="数据转换类型:" value={f.fieldType} onChange={sync(`fields.${i}.fieldType`)} extraStyle={seEx}
                  data={fieldTypeOptions} />
              </Col>
              <Col span={8} style={{ float: 'right' }} onClick={() => mr.removeField(i)}>
                <span className="gHover" style={stMinusBtnWrap}>
                  <MinusCircleOutlined style={stMinusBtn} />
                  <span style={stMinusBtnLabel}>删除</span>
                </span>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <DiSelect title="是否多个存在:" value={f.isMulti} onChange={sync(`fields.${i}.isMulti`)} extraStyle={seEx}
                  data={se.tureOrFalseOptions} />
              </Col>
              {f.isMulti
                ? <Col span={8}>
                  <DiInputNum title="值数量:" value={f.count} onChange={sync(`fields.${i}.count`)} extraStyle={seEx}
                  />
                </Col>
                : ''
              }
            </Row>
          </div>
        ))}
        <Button type="dashed" style={stAddFieldBtn} onClick={mr.addField}><PlusCircleOutlined />新增数据字段</Button>
      </MyCard>
      <VerticalBlank />
      <Button type="link">分组字段设置</Button>
      <VerticalBlank height="8px" />
      {state.groupFields.map((f, i) => (
        <MyCard key={i} title={se.uiGroupTitle(f, i)} headStyle={se.stInnerCard} style={{ marginBottom: '12px' }}>
          <DiSelect title="数据字段:" value={f.fields} onChange={sync(`groupFields.${i}.fields`)}
            mode="multiple" data={mcu.exampleData.options} extraStyle={seGroupFieldsEx}
          />
        </MyCard>
      ))}
    </Card>
  );
}

export default React.memo<IProps>(Step3);
