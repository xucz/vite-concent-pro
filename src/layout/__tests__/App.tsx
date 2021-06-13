import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from '../index';

// 组件实例
let ins = null as any;

/**
 * @author fancyzhong
 * @priority P0
 * @casetype unit
 */
describe('App Render', () => {
  beforeAll(() => {
    // ins = mount(<App />);
    // avoid PrettyFormatPluginError: Invalid string lengthRangeError: Invalid string length
    ins = render(<App />);
  });

  test('generate App snapshot', () => {
    // expect(ins).toMatchSnapshot();
    // avoid PrettyFormatPluginError: Invalid string lengthRangeError: Invalid string length
    expect(toJson(ins)).toMatchSnapshot();
  });
});
