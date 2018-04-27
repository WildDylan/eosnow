/* global window */
/* global document */
/* global location */
/* eslint no-restricted-globals: ["error", "event"] */

import { routerRedux } from 'dva/router'
import { parse } from 'qs'
import config from 'config'
import { EnumRoleType } from 'enums'
import { query, logout } from 'services/app'
import { chain_get_info } from 'services/chain'
import queryString from 'query-string'
import { Localnet } from 'eosjs'
const { prefix } = config

export default {
  namespace: 'app',
  state: {
    eos: {},
    user: {},
    chainInfo: {},
    permissions: {
      visit: [],
    },
    menu: [
      {
        id: '1',
        icon: 'dashboard',
        name: 'Dashboard',
        route: '/dashboard',
      }
    ],
    menuPopoverVisible: false,
    siderFold: window.localStorage.getItem(`${prefix}siderFold`) === 'true',
    darkTheme: false,
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: JSON.parse(window.localStorage.getItem(`${prefix}navOpenKeys`)) || [],
    locationPathname: '',
    locationQuery: {},
    WALLET_NAME: '',
    WALLET_PRIVATE_KEY: ''
  },
  subscriptions: {

    setupHistory ({ dispatch, history }) {
      history.listen((location) => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: queryString.parse(location.search),
          },
        })

        dispatch({ type: 'queryChainInfo' })
      })
    },

    setup ({ dispatch }) {
      dispatch({ type: 'query' })
      let tid
      window.onresize = () => {
        clearTimeout(tid)
        tid = setTimeout(() => {
          dispatch({ type: 'changeNavbar' })
        }, 300)
      };

      // 定时查询块信息
      setInterval(() => {
        dispatch({ type: 'queryChainInfo' })
      }, 30 * 1000);
    },

  },
  effects: {

    * queryChainInfo ({ payload }, { call, put, select }) {
      const chainInfo = yield call(chain_get_info);
      yield put({
        type: 'updateState',
        payload: { chainInfo }
      });
    },

    * query ({ payload }, { call, put, select }) {
      // generate eos configurations with EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV
      let eos = Localnet({keyProvider: '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'});

      let permissions = {
        role: 'admin',
        visit: [`1`]
      };

      yield put({
        type: 'updateState',
        payload: {
          permissions,
          eos
        },
      });

      if ( localStorage.getItem("WALLET_NAME") && localStorage.getItem("WALLET_PRIVATE_KEY") ) {
        // Update to app point WALLET_NAME: '', WALLET_PRIVATE_KEY: ''
        yield put({
          type: 'updateState',
          payload: {
            WALLET_NAME: localStorage.getItem("WALLET_NAME"),
            WALLET_PRIVATE_KEY: localStorage.getItem("WALLET_PRIVATE_KEY"),
          },
        });
        // Go to dash board
        yield put(routerRedux.push({
          pathname: '/dashboard',
        }))
      } else {
        const { locationPathname } = yield select(_ => _.app);
        if ( locationPathname === '/register' ) {
          // Go to register
        } else {
          // Go to login page
          yield put(routerRedux.push({
            pathname: '/login',
          }))
        }
      }
    },

    * logout ({
      payload,
    }, { call, put }) {
      localStorage.clear();
      yield put({ type: 'query' })
    },

    * changeNavbar (action, { put, select }) {
      const { app } = yield (select(_ => _))
      const isNavbar = document.body.clientWidth < 769
      if (isNavbar !== app.isNavbar) {
        yield put({ type: 'handleNavbar', payload: isNavbar })
      }
    },

  },
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

    switchSider (state) {
      window.localStorage.setItem(`${prefix}siderFold`, !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold,
      }
    },

    switchTheme (state) {
      window.localStorage.setItem(`${prefix}darkTheme`, !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme,
      }
    },

    switchMenuPopver (state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      }
    },

    handleNavbar (state, { payload }) {
      return {
        ...state,
        isNavbar: payload,
      }
    },

    handleNavOpenKeys (state, { payload: navOpenKeys }) {
      return {
        ...state,
        ...navOpenKeys,
      }
    },
  },
}
