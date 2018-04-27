import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { chain_get_account, chain_get_code, chain_get_table_rows } from 'services/chain'
import { wallet_api_unlock, wallet_api_lock, wallet_list_wallets, wallet_list_keys } from "services/wallet"
import { model } from 'models/common'
import { message } from 'antd'

export default modelExtend(model, {
  namespace: 'dashboard',
  state: {
    data: {
      originData: {}
    },
    codeData: {
      originData: {}
    },
    tableData: {
      originData: {}
    },
    walletsData: {
      originData: {}
    },
    keysData: {
      originData: {}
    }
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/dashboard' || pathname === '/') {
          dispatch({ type: 'query', payload: {
            account_name: 'eosnow'
          } })

          dispatch({ type: 'query_code', payload: {
            account_name: 'eosnow'
          } })

          dispatch({ type: 'query_eosnow_table', payload: {
            scope: 'eosnow',
            code: 'eosnow',
            table: 'now',
            json: true
          } })

          dispatch({ type: 'query_wallets' })
          dispatch({ type: 'query_keys' })
        }
      })
    },
  },
  effects: {
    * query ({ payload }, { call, put }) {
      const data = yield call(chain_get_account, parse(payload));
      yield put({
        type: 'updateState',
        payload: {
          data
        },
      })
    },

    * query_code ({ payload }, { call, put }) {
      const codeData = yield call(chain_get_code, parse(payload));
      yield put({
        type: 'updateState',
        payload: {
          codeData
        },
      })
    },

    * query_eosnow_table ({ payload }, { call, put }) {
      const tableData = yield call(chain_get_table_rows, parse(payload));
      yield put({
        type: 'updateState',
        payload: {
          tableData
        },
      })
    },

    * lock ({ payload }, { call, put, select }) {
      const { WALLET_NAME } = yield select(_ => _.app);
      const { success } = yield call(wallet_api_lock, JSON.stringify(WALLET_NAME));
      if ( success ) {
        // lock succeed
        message.success('lock wallet success! safe! ');
      } else {
        message.error('lock wallet with some questions, please contact eos node managers!')
      }
    },

    * unlock ({ payload }, { call, put, select }) {
      const { WALLET_NAME, WALLET_PRIVATE_KEY } = yield select(_ => _.app);
      const { success } = yield call(wallet_api_unlock, JSON.stringify([WALLET_NAME, WALLET_PRIVATE_KEY]));
      if ( success ) {
        message.success('unlock success!')
      } else {
        message.error('unlock with error!')
      }
    },

    * query_wallets ({ payload }, { call, put, select }) {
      const walletsData = yield call(wallet_list_wallets, parse(payload));
      yield put({
        type: 'updateState',
        payload: {
          walletsData
        },
      })
    },

    * query_keys ({ payload }, { call, put, select }) {
      const keysData = yield call(wallet_list_keys, parse(payload));
      yield put({
        type: 'updateState',
        payload: {
          keysData
        },
      })
    }
  },
})
