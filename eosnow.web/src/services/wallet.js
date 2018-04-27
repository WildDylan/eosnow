import { request, config } from 'utils'

const { api } = config;
const {
  wallet_create,
  wallet_open,
  wallet_lock,
  wallet_unlock,

  list_wallets,
  list_keys,
} = api;

export function wallet_api_create (params) {
  return request({
    url: wallet_create,
    method: 'post',
    data: params,
  })
}

export function wallet_api_open (params) {
  return request({
    url: wallet_open,
    method: 'post',
    data: params,
  })
}

export function wallet_api_lock (params) {
  return request({
    url: wallet_lock,
    method: 'post',
    data: params,
  })
}

export function wallet_api_unlock (params) {
  return request({
    url: wallet_unlock,
    method: 'post',
    data: params,
  })
}

export function wallet_list_wallets (params) {
  return request({
    url: list_wallets,
    method: 'get',
    data: params,
  })
}

export function wallet_list_keys (params) {
  return request({
    url: list_keys,
    method: 'get',
    data: params,
  })
}
