const APIV1 = '/api/v1';
const CHAIN = '/v1/chain';
const WALLET = '/v1/wallet';

module.exports = {
  name: 'eosnow',
  prefix: 'eosnow',
  footerText: 'eosnow © 2018-04-27 dylan',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  CORS: [],
  openPages: ['/login', '/register'],
  apiPrefix: '/api/v1',
  APIV1,
  CHAIN,
  WALLET,
  api: {
    userLogin: `${APIV1}/user/login`,
    userLogout: `${APIV1}/user/logout`,
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    posts: `${APIV1}/posts`,
    user: `${APIV1}/user/:id`,
    dashboard: `${APIV1}/dashboard`,
    menus: `${APIV1}/menus`,
    weather: `${APIV1}/weather`,
    v1test: `${APIV1}/test`,

    // chain infos
    get_info: `${CHAIN}/get_info`,
    get_account: `${CHAIN}/get_account`,
    get_code: `${CHAIN}/get_code`,
    get_table_rows: `${CHAIN}/get_table_rows`,

    // wallet infos
    wallet_create: `${WALLET}/create`,
    wallet_open: `${WALLET}/open`,
    wallet_lock: `${WALLET}/lock`,
    wallet_unlock: `${WALLET}/unlock`,
    list_wallets: `${WALLET}/list_wallets`,
    list_keys:  `${WALLET}/list_keys`,
  },
}
