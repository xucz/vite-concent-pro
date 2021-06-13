import { defineModule } from 'concent';
import * as timerUtil from 'utils/timer';

const m = defineModule({
  state: () => ({
    small: 1,
    big: 100,
    loading: false,
  }),
  reducer: {
    addSmall(payload, moduleState) {
      return { small: moduleState.small + 1 };
    },
    async asyncAddSmall(payload, moduleState, actionCtx) {
      await actionCtx.setState({ loading: true });
      await timerUtil.delay();
      return { small: moduleState.small + 1 };
    },
    // 组合其他reducer
    async addSmallTwice(payload, moduleState, actionCtx) {
      await actionCtx.dispatch(m.r.addSmall);
      await actionCtx.dispatch(m.r.addSmall);
    },
    someInitLogic() {
      console.log('do some init logic');
    },
    someClearLogic() {
      console.log('do some clear logic');
    },
  },
  computed: {
    doubleSmall(n) {
      return n.small * 2;
    },
  },
  lifecycle: {
    mounted(dispatch, moduleState) {
      dispatch(m.r.someInitLogic);
    },
    willUnmount(dispatch, moduleState) {
      dispatch(m.r.someClearLogic);
    },
  }
});

export const modelDesc = m;

export default {
  CounterOneFileModel: m,
};
