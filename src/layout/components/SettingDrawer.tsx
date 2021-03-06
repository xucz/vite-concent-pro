import React from 'react';
import styled from 'styled-components';
import { Row, Col, Drawer, Switch, Tag, Radio, RadioChangeEvent, Slider } from 'antd';
import copy from 'copy-to-clipboard';
import { HeartOutlined, CopyOutlined } from '@ant-design/icons';
import { SketchPicker, ColorResult, SwatchesPicker } from 'react-color';
import { Blank, VerticalBlank } from 'components/dumb/general';
import { useSetupCtx } from 'services/concent';
import { success } from 'services/message';
import { TopHeaderTypes, TopNavBarTypes, SiderViewTypes } from 'configs/constant/sys';
import { CtxDe } from 'types/store';

const MySwatchesPicker: any = styled(SwatchesPicker)`
  width: 450px !important;
`;

const stLoveIcon: React.CSSProperties = { color: 'var(--theme-color)', transform: 'translateY(2px)' };

export function setup(ctx: CtxDe) {
  const { gr, globalState } = ctx;
  const ins = ctx.initState({
    pickerMode: 'fast',
  });

  return {
    state: ins.state,
    closeThemeSettingsDrawer: () => ctx.setGlobalState({ settingDrawerVisible: false }),
    changePickerMode(e: RadioChangeEvent) {
      ins.setState({ pickerMode: e.target.value });
    },
    changeTopHeaderType(e: RadioChangeEvent) {
      gr.setState({ topHeaderType: e.target.value });
    },
    changeTopNavBarType(e: RadioChangeEvent) {
      gr.setState({ topNavBarType: e.target.value });
    },
    changeSiderViewType(e: RadioChangeEvent) {
      gr.changeSiderViewType(e.target.value);
    },
    onWebsiteColorChange(colorResult: ColorResult) {
      gr.changeThemeColor({ themeColor: colorResult.hex, setCustThemeColor: true });
    },
    onSiderThemeChange(checked: boolean) {
      gr.switchSiderTheme(checked);
    },
    changeIsUsingDefaultTheme(checked: boolean) {
      gr.changeIsUsingDefaultTheme(checked);
    },
    onHeaderThemeChange(checked: boolean) {
      gr.switchHeaderTheme(checked);
    },
    onInnerMockChange(checked: boolean) {
      gr.changeIsInnerMock(checked);
    },
    copyColor() {
      copy(globalState.themeColor);
      success(`?????? ${globalState.themeColor} ?????????`, 1);
    },
    changeIsTabPaneHeavyBg: (isTabPaneHeavyBg: boolean) => {
      gr.changeIsTabPaneHeavyBg(isTabPaneHeavyBg);
    },
  };
}

export function SettingDrawer() {
  const { globalState: gst, globalComputed: gcu, settings: se, gr } = useSetupCtx(setup, { tag: 'SettingPanel' });

  return (
    <Drawer title="????????????" visible={gst.settingDrawerVisible} width="550px"
      onClose={se.closeThemeSettingsDrawer}
    >
      <div style={{ padding: '6px 12px' }}>
        <Tag color="geekblue">?????????????????????</Tag>
        <Blank />
        <Radio.Group value={se.state.pickerMode} onChange={se.changePickerMode}>
          <Radio value="fast">??????</Radio>
          <Radio value="professional">??????</Radio>
        </Radio.Group>
        <Tag color={gst.themeColor}>{gst.themeColor}</Tag>
        <CopyOutlined className="gHover" onClick={se.copyColor} />
        <VerticalBlank />
        {se.state.pickerMode === 'fast'
          && <MySwatchesPicker color={gst.themeColor} onChange={se.onWebsiteColorChange} />
        }
        {se.state.pickerMode === 'professional'
          && <SketchPicker color={gst.themeColor} onChange={se.onWebsiteColorChange}
            onChangeComplete={se.onWebsiteColorChange}
          />
        }
        <VerticalBlank />
        <Row gutter={[16, { xs: 8, sm: 12, md: 12, lg: 12 }]}>
          <Col span="10"><Tag color="geekblue">?????????????????????</Tag></Col>
          <Col span="14">
            <Switch checkedChildren="???" unCheckedChildren="???" checked={gst.isUsingDefaultThemeColor} onChange={se.changeIsUsingDefaultTheme} />
          </Col>
          <Col span="10"><VerticalBlank height="5px" /><Tag color="geekblue">????????????????????????</Tag></Col>
          <Col span="14">
            <Slider value={gst.fontAlpha} min={0} max={100} onChange={gr.changeFontAlpha} />
          </Col>
          <Col span="10"><Tag color="geekblue">??????????????????????????????</Tag></Col>
          <Col span="14">
            <Switch checked={gst.isTabPaneHeavyBg} onChange={se.changeIsTabPaneHeavyBg}
              checkedChildren="???" unCheckedChildren="???"
            />
          </Col>
          <Col span="10"><Tag color="geekblue">???????????????</Tag></Col>
          <Col span="14">
            <Switch checkedChildren="??????" unCheckedChildren="??????" checked={gcu.siderThemeSwitchChecked} onChange={se.onSiderThemeChange} />
          </Col>
          <Col span="10"><Tag color="geekblue">???????????????</Tag></Col>
          <Col span="14">
            <Switch checkedChildren="??????" unCheckedChildren="??????" checked={gcu.headerThemeSwitchChecked}
              onChange={se.onHeaderThemeChange}
            />
          </Col>
          <Col span="10"><Tag color="geekblue">???????????????</Tag></Col>
          <Col span="14">
            <Radio.Group value={gst.topHeaderType} onChange={se.changeTopHeaderType}>
              <Radio value={TopHeaderTypes.FIXED}>??????</Radio>
              <Radio value={TopHeaderTypes.FLOWED}>???Y?????????</Radio>
              <Radio value={TopHeaderTypes.HIDDEN}><HeartOutlined style={stLoveIcon} />??????</Radio>
            </Radio.Group>
          </Col>
          <Col span="10"><Tag color="geekblue">??????????????????</Tag></Col>
          <Col span="14">
            <Radio.Group value={gst.topNavBarType} onChange={se.changeTopNavBarType}>
              <Radio value={TopNavBarTypes.FIXED}><HeartOutlined style={stLoveIcon} />??????</Radio>
              <Radio value={TopNavBarTypes.FLOWED}>???Y?????????</Radio>
              <Radio value={TopNavBarTypes.HIDDEN}>??????</Radio>
            </Radio.Group>
          </Col>
          <Col span="10"><Tag color="geekblue">???????????????</Tag></Col>
          <Col span="14">
            <Radio.Group value={gst.siderViewType} onChange={se.changeSiderViewType}>
              <Radio value={SiderViewTypes.COLLAPSED}><HeartOutlined style={stLoveIcon} />??????</Radio>
              <Radio value={SiderViewTypes.NOT_COLLAPSED}>??????</Radio>
              <Radio value={SiderViewTypes.HIDDEN}>??????</Radio>
            </Radio.Group>
          </Col>
          <Col span="10"><Tag color="geekblue">innerMock?????????</Tag></Col>
          <Col span="14">
            <Switch checkedChildren="??????" unCheckedChildren="??????" checked={gst.isInnerMock}
              onChange={se.onInnerMockChange}
            />
          </Col>
        </Row>
      </div>
    </Drawer>
  );
}

export default React.memo(SettingDrawer);
