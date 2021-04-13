import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { Button } from 'antd';
import { getRef } from 'concent';
import Demo, { setup } from '../index';
import { getModelState, moduleName, Ctx } from '../model/meta';

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
    const mockRouterProps = { history: {} as any, location: {} as any, match: {} as any };
    ins = mount(<Demo {...mockRouterProps} />);
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
    const big = getModelState().bigValue;
    expect(`${big}` === oldVal).toBeTruthy();

    btnWrap.simulate('click');

    const newVal = ins.find('span#bigValue').text();
    expect(big + 1 === getModelState().bigValue).toBeTruthy();
    expect(`${big + 1}` === newVal).toBeTruthy();
  });

  test('sttings.hiThere', () => {
    const ret = ref.ctx.settings.hiThere();
    expect(ret).toBe('hiThere');

    ref.ctx.settings.changeBigTo(300);
    expect(getModelState().bigValue === 300).toBeTruthy(); // moduleState断言
  });

});
