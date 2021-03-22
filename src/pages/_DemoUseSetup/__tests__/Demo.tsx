import React from 'react';
import { mount } from 'enzyme';
import Demo from '../index';

// 组件实例
let ins = null as any;

/**
 * @author fancyzhong
 * @priority P0
 * @casetype unit
 */
describe('Demo Render', () => {
  beforeAll(() => {
    const mockRouterProps = { history: {} as any, location: {} as any, match: {} as any };
    ins = mount(<Demo {...mockRouterProps} />);
  });

  test('generate Demo snapshot', () => {
    expect(ins).toMatchSnapshot();
  });
});
