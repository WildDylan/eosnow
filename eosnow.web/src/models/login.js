import { routerRedux } from 'dva/router'
import { wallet_api_open, wallet_api_unlock } from 'services/wallet'
import { message } from 'antd'

export default {
  namespace: 'login',

  state: {},

  effects: {
    * login ({
      payload,
    }, { put, call, select }) {

      let WALLET_NAME = payload.WALLET_NAME;
      let WALLET_PRIVATE_KEY = payload.WALLET_PRIVATE_KEY;

      const open = yield call(wallet_api_open, JSON.stringify(WALLET_NAME));

      if ( open.success ) {
        message.info("Wallet open succeed!, checking unlock with your private key...");

        const unlock = yield call(wallet_api_unlock, JSON.stringify([WALLET_NAME, WALLET_PRIVATE_KEY]));
        if ( unlock.success ) {

          message.success("wallet unlock succeed!");

          localStorage.setItem("WALLET_NAME", WALLET_NAME);
          localStorage.setItem("WALLET_PRIVATE_KEY", WALLET_PRIVATE_KEY);

          yield put({ type: 'app/query' });
          yield put(routerRedux.push('/dashboard'));
        } else {
          throw unlock;
        }
      } else {
        throw open;
      }
    },
  },

}
