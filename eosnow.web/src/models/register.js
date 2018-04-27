import { routerRedux } from 'dva/router'
import { wallet_api_create } from 'services/wallet'

export default {
  namespace: 'register',

  state: {},

  effects: {
    * register ({ payload }, { put, call, select }) {

      let name = payload.WALLET_NAME;

      const { success, originData } = yield call(wallet_api_create, JSON.stringify(name));

      localStorage.setItem("WALLET_NAME", name);
      localStorage.setItem("WALLET_PRIVATE_KEY", originData);

      if (success) {
        yield put({ type: 'app/query' });
        yield put(routerRedux.push('/dashboard'))
      } else {
        throw originData
      }
    },
  },

}
