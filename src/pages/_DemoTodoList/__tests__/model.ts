import * as rd from '../model/reducer';
import * as lifecycle from '../model/lifecycle';
import { getModelState } from '../model/meta';
import { dispatch } from 'concent';

/**
 * @author fancyzhong
 * @priority P0
 * @casetype unit
 */
describe('Demo model', () => {
  test('reducer.clear', async () => {
    const ret = await dispatch(rd.clear);
    expect(ret).toMatchObject({ value: 1 });
  });

  test('reducer.clear way2', async () => {
    const state = getModelState();
    const ori = state.bigValue;
    await dispatch(rd.addBig);
    expect(state.bigValue === ori + 1);
  });


  test('reducer.forCopy', async () => {
    await dispatch(rd.forCopy);
  });

  test('lifecycle.forCopy', async () => {
    lifecycle.willUnmount(dispatch);
  });
});
