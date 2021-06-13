import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { Button } from 'antd';
import { getRef, ICtxBase, IAnyObj, IRefCtxM, SettingsType } from 'concent';
import { getModelState } from 'services/concent';
import { RootState, RootCu } from 'types/store';
import * as models from 'models';
import Demo, { setup } from '../index';

const moduleName = 'TodoList';

type RootInfo = { state: RootState, computed: RootCu };
type ValidSetup = (ctx: ICtxBase) => IAnyObj | void;
type Ctx<Setup extends ValidSetup> = IRefCtxM<RootInfo, {}, typeof models.TodoList, SettingsType<Setup>>;

// 组件实例
let ins = null as unknown as ReactWrapper;
let ref = null as unknown as { ctx: Ctx<typeof setup> };

/**
 * @author fancyzhong
 * @priority P0
 * @casetype unit
 */
describe('Demo Render', () => {
  beforeAll(() => {
    ins = mount(<Demo />);
    const c2Ref = getRef<Ctx<typeof setup>>({ moduleName, tag: 'Dpt' });
    if (!c2Ref) {
      throw new Error('you may forget add tag for component');
    }
    ref = c2Ref;
  });

  test('generate Demo snapshot', () => {
    expect(ins).toMatchSnapshot();
  });

  test('call addBig', () => {
    const btnWrap = ins.find(Button).find('button#addBigBtn');
    const oldVal = ins.find('span#bigValue').text();
    const big = getModelState(moduleName).bigValue;
    expect(`${big}` === oldVal).toBeTruthy();

    btnWrap.simulate('click');

    const newVal = ins.find('span#bigValue').text();
    expect(big + 1 === getModelState(moduleName).bigValue).toBeTruthy();
    expect(`${big + 1}` === newVal).toBeTruthy();
  });

  test('settings.hiThere', () => {
    const ret = ref.ctx.settings.hiThere();
    expect(ret).toBe('hiThere');

    ref.ctx.settings.changeBigTo(300);
    expect(getModelState(moduleName).bigValue === 300).toBeTruthy(); // moduleState断言
    expect(ins.find('h1#bigValue').text() === '300').toBeTruthy(); // 渲染后的ui断言
  });

});
